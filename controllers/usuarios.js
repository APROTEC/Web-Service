var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js");
var personas = require('./informacion_personas');

exports.loginAsAdmin = function (req, resp, email, password) {
	 var sqlStament =	"select codigo_usuario,nombre_usuario,codigo_tipo_usuario,codigo_informacion_persona,fecha_ingreso,fecha_salida "+
						"from Usuarios "+
						"where "+
						"nombre_usuario = '"+ email + "' and "+
						"contrasena = '"+password +"' and "+
						"(codigo_tipo_usuario = 'a' or codigo_tipo_usuario = 's') ";
	db.executeSql(sqlStament, function (data, err) {
		if (err) {
			error.displayError(err,resp);
		}
		else{
			queryReturn.displayDataSet(data, resp);
		}
    });


};



exports.loginAsUser = function (req, resp, email, password) {
    var sqlStament = "select codigo_usuario,nombre_usuario,codigo_tipo_usuario,codigo_informacion_persona,fecha_ingreso,fecha_salida  " +
						"from Usuarios " +
						"where " +
						"nombre_usuario = '" + email + "' and " +
						"contrasena = '" + password+"'";
    db.executeSql(sqlStament, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });


};



exports.getUser = function (req, resp, codigo_usuario) {
    var sqlStament = "select codigo_usuario,nombre_usuario,codigo_tipo_usuario,codigo_informacion_persona,fecha_ingreso,fecha_salida " +
						"from Usuarios " +
						"where " +
						"codigo_usuario = "+codigo_usuario;
    db.executeSql(sqlStament, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });


};


exports.getAllUsers = function (req, resp) {
    var sqlStament = "select  codigo_usuario,nombre_usuario,codigo_tipo_usuario,codigo_informacion_persona,fecha_ingreso,fecha_salida " +
						"from Usuarios " +
                        "where codigo_tipo_usuario != 's'";
    db.executeSql(sqlStament, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });


};


exports.insertNewUser = function (req, resp, usuario) {
    personas.insertNewPerson(req, resp,usuario);
    

};
exports.changePassword = function (req, resp,codigo_usuario,password) {
    var sqlStatement = "update usuarios set contrasena = '" + password + "' where codigo_usuario = " + codigo_usuario;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });


};

