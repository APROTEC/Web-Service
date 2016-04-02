var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.getAllProvincias = function (req, resp) {
    var sqlStatement = "select * " +
                        "from Provincias";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};

exports.getProvincia = function (req, resp, codigo_provincia) {
    var sqlStatement = "select * " +
                        "from Provincias " +
                        "where codigo_provincia = " + codigo_provincia;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};