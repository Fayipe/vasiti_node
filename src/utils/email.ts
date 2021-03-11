import { AppError } from './app-error';
import nodemailer from "nodemailer";
import { GMAIL_USERNAME, GMAIL_PASSWORD } from "../config/index";

// const sendMail = async (body: string, to: string[], subject?: string) => {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: testAccount. // generated ethereal user
//             pass: testAccount.pass, // generated ethereal password
//         },
//         tls: {
//             rejectUnauthorized: false,
//         },
//     });

//     const recipients: string = to.toString();
//     let info = await transporter.sendMail({
//         from: '"myPaddi" <admin@mobicure.biz>', // sender address
//         to: recipients, // list of receivers
//         subject: (subject) ? subject : "New mail from myPaddi", // Subject line
//         html: body, // html body
//     });

//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//     return info;

// };
const sendMailGmail = async (body: string, to: string[], subject?: string) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: GMAIL_USERNAME, // generated ethereal user
            pass: GMAIL_PASSWORD, // generated ethereal password
        },
    });
    const recipients: string = to.toString();
    const mailOptions = {
        from: '"myPaddi" <noreply@mypaddiapp.com>',
        to: recipients,
        subject: (subject) ? subject : "New mail from myPaddi",
        generateTextFromHTML: true,
        html: body,
    };
    const info = await transporter.sendMail(mailOptions);
    // if (info) {
    //     return info;
    // }
    console.log("Message sent: %s", info);
    return info;

};
export const sendPasswordReset = async (code: string, user: any) => {
    const message =
        `<h3>Hi ${user.username},</h3>
        <p>Here's the password reset code you requested: <strong>${code}</strong></p>
        <p>If you believe you did this in error, please ignore this email.</p>`;
    const sentMail = await sendMailGmail(message, [user.email], "Password Reset Code");
    if (sentMail) {
        return "success";
    }
    throw new AppError("Could not send mail");
};
