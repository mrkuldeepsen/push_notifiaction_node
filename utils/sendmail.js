const nodemailer = require("nodemailer")

const sendMail =  async function(email,subject){
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    let info = await transporter.sendMail({
        from: process.env.SMTP_USER, 
        to: email, 
        subject: subject, 
        text: "you have successfully submitted your form", 
        html: "<b>Welcome!</b>", 
      });
}

module.exports = sendMail

