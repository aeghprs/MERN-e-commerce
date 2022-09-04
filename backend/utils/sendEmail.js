const nodemailer = require('nodemailer');

const sendEmail = async options => {
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "76cc259fa4d44a",
          pass: "bf9c22deb2790a"
        }
      });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)
}

module.exports = sendEmail;