const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASS } = process.env;
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: { user: AUTH_EMAIL,pass: AUTH_PASS }
})

// test transporter
transporter.verify((error, success) => {
  error ? console.log(error) : console.log("Ready For send Email", success);
})

const sendEmail = async (mailOptions) => {
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;