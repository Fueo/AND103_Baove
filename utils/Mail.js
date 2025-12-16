const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'lieuthienhao2006@gmail.com',
        pass: 'lbgv mdow yvva owob'
    }
});

module.exports = { transporter };
