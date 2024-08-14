import nodemailer from "nodemailer";

const transporter = () => {
    let transporter = {
        sendMail(mailOptions, cb) {
            cb('SMTP is not configured')
        }
    }

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
            service: process.env.SMTP_TRANSPORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
    }

    return transporter

}


export const sendMail = ({to, subject, html}) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html
    };

    transporter().sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}