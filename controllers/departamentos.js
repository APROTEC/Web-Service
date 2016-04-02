var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getAllDepartamentos = function (req, resp) {
    var sqlStatement = "select * from departamentos";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


exports.getDepartamento = function (req, resp, codigo_departamento) {
    var sqlStatement = "select * from departamentos where codigo_departamento = " + codigo_departamento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};