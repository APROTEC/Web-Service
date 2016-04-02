var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getSede = function (req,resp,codigo_sede) {
    var sqlStatement = "select * " +
                        "from sedes " +
                        "where codigo_sede = " + codigo_sede;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.getAllSedes = function (req, resp) {
    var sqlStatement = "select * " +
                        "from sedes ";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};