var nodemailer = require('./emailSender.js');
var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")




changeMailParameters = function (asunto, correos, texto) {
    nodemailer.mailBody.subject = asunto;
    nodemailer.mailBody.to = correos;
    nodemailer.mailBody.text = texto;
};




exports.sendMails = function (req, res, asunto,correos,texto) {
    changeMailParameters(asunto, correos, texto);
    nodemailer.sendMail();
    queryReturn.displayDataSet(1, res);


};