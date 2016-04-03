var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.getAllOpcionesAcompanantes = function (req, resp) {
    var sqlStatement = "select * from opciones_acomponante";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.getOpcionAcompanante = function (req, resp,codigo_acompanante) {
    var sqlStatement = "select * from opciones_acomponante where codigo_opcion_acompanante = "+codigo_acompanante;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.insertOpcionAcompanante = function (req, resp, opcion_acompanante) {
    var sqlStatement = "insert into opciones_acomponante (descripcion) values('" + opcion_acompanante.descripcion + "')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });
};

exports.actualizarOpcionAcompanante = function (req, resp, opcion_acompanante) {
    var sqlStatement = "update opciones_acomponante set descripcion = '" + opcion_acompanante.descripcion + "'";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });


};