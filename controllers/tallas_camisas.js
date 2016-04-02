var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getAllTallasCamisas = function (req, resp) {
    var sqlStatement = "select * from tallas_camisas";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};