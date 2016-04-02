var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getSubDepartamentosFromDepartamentos = function (req, resp, codigo_departamento) {
    var sqlStatement = "select *" +
                        "from sub_departamentos " +
                        "where codigo_departamento =" + codigo_departamento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};



exports.getSubDepartamento = function (req, resp, codigo_sub_departamento) {
    var sqlStatement = "select *" +
                        "from sub_departamentos " +
                        "where codigo_sub_departamento =" + codigo_sub_departamento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};