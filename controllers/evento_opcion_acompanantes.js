var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getAllEventosOpcionAcompanantes = function (req, resp, codigo_evento) {
    var sqlStatement = "select * from Evento_Opciones_Acompanante where codigo_evento = " + codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.insertEvento_Opcion_Acompanante = function (req, resp, evento_opcion_acompanante) {
    var sqlStatement = "insert into Evento_Opciones_Acompanante (codigo_opcion_acompanante,codigo_evento,precio) values" +
                        " ("+ evento_opcion_acompanante.codigo_opcion_acompanante+","+evento_opcion_acompanante.codigo_evento+","+ evento_opcion_acompanante.precio+")"
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });   
};


exports.deleteEvento_Opcion_Acompanante = function (req, resp, evento_opcion_acompanante){
    var sqlStatement = "delete evento_opciones_acompanante where codigo_evento = " + evento_opcion_acompanante.codigo_evento +
                        " and codigo_opcion_acompanante = " + evento_opcion_acompanante.codigo_opcion_acompanante;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });   

}