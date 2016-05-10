var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getAllUserGuests = function (req, resp, codigo_evento, codigo_usuario) {
    var sqlStatement = "select au.*,oa.descripcion from opciones_acomponante oa, acompanantes_usuarios au " +
                       "where au.codigo_usuario = " + codigo_usuario + " and au.codigo_evento = " + codigo_evento +
                       " and oa.codigo_opcion_acompanante = au.codigo_opcion_acompanante";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });


};

function insertarAcompanantesValidado(resp, acompanantes_usuario){
    var sqlStatement = 
    "insert into acompanantes_usuarios(codigo_evento, codigo_usuario, codigo_opcion_acompanante, numero_acompanantes) " +
    "values(" + acompanantes_usuario.codigo_evento + ", " + acompanantes_usuario.codigo_usuario + "," + acompanantes_usuario.codigo_opcion_acompanante + "," + acompanantes_usuario.numero_acompanantes + ") " +
    "update usuarios_invitados  " +
    "set precio_entradas = (precio_entradas+eoa.precio * " + acompanantes_usuario.numero_acompanantes + ") " +
    "from Evento_Opciones_Acompanante eoa " +
    "where eoa.codigo_evento = " + acompanantes_usuario.codigo_evento + " and " +
    "eoa.codigo_opcion_acompanante = " + acompanantes_usuario.codigo_opcion_acompanante+" and "+
    "codigo_usuario = "+acompanantes_usuario.codigo_usuario;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });


};

exports.insertAcompanante = function (req, resp, acompanantes_usuario) {
    var sqlStatement = 
        "DECLARE @return int " +
        "EXEC @return = dbo.uspCheckInvitedGuests "+acompanantes_usuario.codigo_evento+","+ acompanantes_usuario.codigo_usuario+","+acompanantes_usuario.numero_acompanantes+"; " +
        "select @return as data";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            if (data[0].data == 1) {
                
                insertarAcompanantesValidado(resp, acompanantes_usuario);
            }
            else {
           
                queryReturn.displayDataSet(-1, resp);
            }
        }
    });

};