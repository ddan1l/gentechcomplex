import formidable from "formidable";
import fs from "fs";
import {v4} from "uuid";

import db from "../services/db.js";
import {sendMail} from "../services/smtp.js";

const submitTemplate = fs.readFileSync('templates/submit.html').toString()


const createTemplate = async ({email, phone, address, setsCount, fullName, href}) => {
    return submitTemplate
        .replaceAll(`{email}`, email)
        .replaceAll(`{phone}`, phone)
        .replaceAll(`{address}`, address)
        .replaceAll(`{setsCount}`, setsCount)
        .replaceAll(`{fullName}`, fullName)
        .replaceAll(`{href}`, href)
}

export const handleSubmit = async (request, response) => {
    const [fields] = await formidable().parse(request);

    for (const field in fields) {
        fields[field] = fields[field][0]
    }

    const {email, phone, setsCount, fullName, address} = fields

    const uuid = v4()

    const href = `${request.headers.origin}/approve?uuid=${uuid}`


    const html = await createTemplate({email, phone, address, setsCount: setsCount || 1, fullName, href})

    try {
        const applications = db().collection('applications')

        const insertResult = await applications.insertOne({
            uuid,
            email,
            phone,
            fullName,
            setsCount,
            address,
            statusId: 1,
            paymentId: null,
            createdAt: new Date(),
        });


        if (insertResult) {
            sendMail({to: process.env.SMTP_RECIPIENT, subject: 'Новый заказ', html})
        }

        response.writeHead(302, {Location: `/waiting?uuid=${uuid}`})
        response.end()

    } catch (e) {
        console.log(e)

        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("Something went wrong");
    }
}
