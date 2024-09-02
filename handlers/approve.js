import querystring from "node:querystring"
import db from "../services/db.js";
import { sendMail } from "../services/smtp.js";

import { handleAsset } from "./asset.js";
import fs from "fs";
import orderStatus from "./constants/orderStatus.js";

const approvedTemplate = fs.readFileSync('templates/approved.html').toString()

const createTemplate = async ({ setsCount, amount, href }) => {
    return approvedTemplate
        .replaceAll(`{setsCount}`, setsCount)
        .replaceAll(`{amount}`, amount)
        .replaceAll(`{href}`, href)
}


export const handleApprove = async (request, response) => {
    const params = querystring.parse(request.url.replace('/approve?', ''))

    try {

        if (!params?.uuid) {
            response.writeHead(404);
        } else {
            const applications = db().collection('applications')
            const application = await applications.findOne({ uuid: params.uuid })

            if (!application) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.end("Order not found");
            } else {
                const payHref = `${process.env.APP_URL}/pay?uuid=${params.uuid}`

                if (application.email) {
                    const html = await createTemplate({
                        setsCount: application.setsCount || 1,
                        amount: application.amount,
                        href: payHref
                    })

                    sendMail({ to: application.email, subject: 'Заказ подтвержден', html })
                }

                applications.updateOne(
                    { uuid: params.uuid },
                    {
                        $set: {
                            statusId: orderStatus.APPROVED,
                            updatedAt: new Date(),
                        }
                    }
                );

                handleAsset.bind({ asset: 'approve.html' })(request, response)
            }
        }
    } catch (e) {
        console.log(e)

        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Smth went wrong");
    }
}