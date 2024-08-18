import db from "../services/db.js";
import querystring from "node:querystring"
import fs from "fs"
import path from "path"
import productPrice from "./constants/productPrice.js"

const payPage = fs.readFileSync(path.join('dist', 'pages', 'pay.html')).toString()


const createTemplate = async ({ html, count, amount, price, amount_formated, price_formated, email }) => {
    return html
        .replaceAll(`{count}`, count)
        .replaceAll(`{amount}`, amount)
        .replaceAll(`{price}`, price)
        .replaceAll(`{amount_formated}`, amount_formated)
        .replaceAll(`{price_formated}`, price_formated)
        .replaceAll(`{email}`, email)
}

export const handlePay = async (request, response) => {

    const params = querystring.parse(request.url.replace('/pay?', ''))

    try {

        if (!params?.uuid) {
            response.writeHead(404);
        } else {
            const applications = db().collection('applications')
            const application = await applications.findOne({ uuid: params.uuid })

            if (!application) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.end("Order not found");
                return
            }

            const count = application?.setsCount || 1
            const email = application?.email || application?.phone || ''
            const price = productPrice
            const amount = productPrice * count
            const amount_formated = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
                amount,
            )
            const price_formated = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
                price,
            )

            const html = await createTemplate({ html: payPage, count, amount, price, amount_formated, price_formated, email })

            response.writeHead(200, {
                "Content-Type": "text/html; charset=UTF-8",
            });

            response.write(html)
            response.end();
        }
    } catch (e) {
        console.log(e)

        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Smth went wrong");
    }


}