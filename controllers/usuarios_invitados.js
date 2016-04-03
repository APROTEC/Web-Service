﻿var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.updateUsuario_Invitado = function (req, resp, usuario_invitado) {
    var sqlStatement = "update usuarios_invitados set confirmado = "+(usuario_invitado.confirmado==true?1:0)+" "+
                       ", precio_entradas = " + usuario_invitado.precio_entradas+" "+
                       "where codigo_usuario = "+usuario_invitado.codigo_usuario+" and codigo_evento = "+usuario_invitado.codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });

};

exports.delete_invitado = function (req, resp, usuario_invitado) {
    var sqlStatement = "delete usuarios_invitados where codigo_usuario = " + usuario_invitado.codigo_usuario + " and codigo_evento = " + usuario_invitado.codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });

};