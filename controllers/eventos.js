var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.getAllEventos = function (req, resp) {
    var sqlStatement = "select * from eventos order by fecha_hora desc";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.getEvento = function (req, resp, codigo_evento) {
    var sqlStatement = "select * from eventos where codigo_evento = "+codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
    

};

exports.insertEvento = function (req, resp, evento) {
    var sqlStatement = "insert into eventos (lugar,fecha_hora,numero_maximo_acompanantes,descripcion,codigo_tipo_evento)"+
                        "values('"+evento.lugar+"',CONVERT(datetime,'"+evento.fecha_hora+"'),"+evento.numero_maximo_acompanantes+",'"+evento.descripcion+"',"+evento.codigo_tipo_evento+")";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });


};

exports.updateEvento = function (req, resp, evento) {
    var sqlStatement = "update eventos " +
                       "set lugar = '" + evento.lugar + "', " +
                       "fecha_hora = CONVERT(datetime,'" + evento.fecha_hora + "')," +
                       "numero_maximo_acompanantes = " + evento.numero_maximo_acompanantes + "," +
                       "descripcion = '" + evento.descripcion + "'," +
                       "codigo_tipo_evento = " + evento.codigo_tipo_evento+
                       " where codigo_evento = "+evento.codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });

};

exports.deleteUsuario = function (req, resp, codigo_evento) {
    var sqlStatement = "delete eventos where codigo_evento = "+codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });

};