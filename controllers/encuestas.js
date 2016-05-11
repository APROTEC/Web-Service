var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getAllEncuestas = function (req, resp) {
    var sqlStatement = "select * " +
                        "from encuestas " +
                        "order by codigo_encuesta";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.getEncuesta = function (req, resp, codigo_encuesta) {
    var sqlStatement = "select * " +
                       "from encuestas " +
                       "where codigo_encuesta = " + codigo_encuesta;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


exports.updateEncuesta = function (req, resp, encuesta) {
    var sqlStatement = "update encuestas " +
                        "set nombre_encuesta = '" + encuesta.nombre_encuesta + "'," +
                        "link_encuesta = '" + encuesta.link_encuesta + "' "+
                        "where codigo_encuesta = "+encuesta.codigo_encuesta;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

};


exports.insertEncuesta = function (req, resp, encuesta) {
    var sqlStatement = "insert into encuestas (nombre_encuesta,link_encuesta) " +
                       "values ('" + encuesta.nombre_encuesta + "','" + encuesta.link_encuesta + "')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

};


exports.deleteEncuesta = function (req, resp, codigo_encuesta){
    var sqlStatement = "delete encuestas_usuarios where codigo_encuesta = " + codigo_encuesta+" ";
    sqlStatement = "delete encuestas where codigo_encuesta = " + codigo_encuesta;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

}