var nodemailer = require('./emailSender.js');
var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")



sendPassword = function (req, res, username,password){
    nodemailer.mailBody.subject = "Recuperación de contraseñas";
    nodemailer.mailBody.to = username;
    nodemailer.mailBody.text = "Su contraseña es "+ password;
    nodemailer.sendMail();
    queryReturn.displayDataSet(1, res);
}


getActualPassword = function (req,res,username) {
    var sqlStatement = "select contrasena " +
                        "from usuarios " +
                        "where nombre_usuario = '" + username+"'";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            sendPassword(req, res, username, data[0].contrasena);

        }
    });


};




exports.enviarPassword = function (req, res, username) {
    getActualPassword(req, res, username);


};