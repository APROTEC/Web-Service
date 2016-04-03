var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.getAllTiposEventos = function (req, resp) {
    var sqlStatement = "select * from tipos_eventos";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


exports.getTipoEvento = function (req, resp, codigo_evento) {
    var sqlStatement = "select * from tipos_eventos where codigo_tipo_evento = " + codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};


exports.crearTipoEvento = function (req, resp, tipo_evento) {
    var sqlStatement = "insert into tipos_eventos (descripcion) values('" + tipo_evento.descripcion + "')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });
};

exports.actualizarTipoEvento = function (req, resp, tipo_evento) {
    var sqlStatement = "update tipos_eventos set descripcion = '"+ tipo_evento.descripcion + "'"+
                        "where codigo_tipo_evento = "+tipo_evento.codigo_tipo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });
};


