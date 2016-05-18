var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.updateUsuario_Invitado = function (req, resp, usuario_invitado) {
    var sqlStatement = "update usuarios_invitados set confirmado = "+(usuario_invitado.confirmado==true?1:0)+" "+
                       ", precio_entradas = " + (usuario_invitado.confirmado == true?usuario_invitado.precio_entradas:0)+" "+
                       "where codigo_usuario = " + usuario_invitado.codigo_usuario + " and codigo_evento = " + usuario_invitado.codigo_evento;
    if (!(usuario_invitado.confirmado)) {
        sqlStatement += " delete acompanantes_usuarios where codigo_usuario = " + usuario_invitado.codigo_usuario + " and codigo_evento = " + usuario_invitado.codigo_evento;
    }
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

};

exports.delete_invitado = function (req, resp, usuario_invitado) {
    var sqlStatement = " delete acompanantes_usuarios where codigo_usuario = " + usuario_invitado.codigo_usuario + " and codigo_evento = " + usuario_invitado.codigo_evento;
    sqlStatement += " delete usuarios_invitados where codigo_usuario = " + usuario_invitado.codigo_usuario + " and codigo_evento = " + usuario_invitado.codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

};

exports.getCantidadInvitados = function (req, resp, codigo_evento) {
    var sqlStatement = 'select COUNT(codigo_usuario) as invitados ' +
                        'from usuarios_invitados ' +
                        'where codigo_evento = ' + codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


exports.getCantidadInvitadosConfirmados = function (req, resp, codigo_evento) {
    var sqlStatement = 'select COUNT(codigo_usuario) as invitados ' +
                        'from usuarios_invitados ' +
                        'where codigo_evento = ' + codigo_evento + ' ' +
                        'and confirmado = 1';
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


exports.getCantidadAcompanantes = function (req, resp, codigo_evento){
    var sqlStatement = "select oa.descripcion, sum(au.numero_acompanantes) " +
                        "from acompanantes_usuarios au, opciones_acomponante oa " +
                        "where au.codigo_evento = " + codigo_evento + " and oa.codigo_opcion_acompanante = au.codigo_opcion_acompanante " +
                        "group by au.codigo_opcion_acompanante, oa.descripcion";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
}