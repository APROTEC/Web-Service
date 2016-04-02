var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.getCantonesFromProvincia = function (req, resp, codigo_provincia) {
    var sqlStatement = "select * " +
                        "from cantones " +
                        "where codigo_provincia =" + codigo_provincia;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.getCanton = function (req, resp, codigo_canton) {
    var sqlStatement = "select c.*,p.nombre_provincia " +
                        "from cantones c, provincias p " +
                        "where c.codigo_canton = " + codigo_canton+" and "+
                        "c.codigo_provincia = p.codigo_provincia";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};