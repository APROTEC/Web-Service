var nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "aprotec.organization@gmail.com",
        pass: "aprotec2016"
    }
});

// setup e-mail data with unicode symbols
var mailOptions =  {
    from: " <aprotec.organization@gmail.com>", // sender address
    to: "ldrc2895@gmail.com", // list of receivers
    subject: "Recuperación de contraseña", // Subject line
    text: "Hello world ✔"
}


exports.mailBody = mailOptions;
exports.sendMail = function () {
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}