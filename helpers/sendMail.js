const nodemailer = require("nodemailer");
const config = require("config");
const mailpass = config.get("mail.pass");
var transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secureConnection:false,
    tls:{
        ciphers:"SSLv3"
    },
    auth:{
        user:"furkanasdf26@gmail.com",
        pass:mailpass
    }
})
module.exports=transporter;
