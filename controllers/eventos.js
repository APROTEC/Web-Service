var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.getAllEventos = function (req, resp) {
    var sqlStatement = "select * from eventos order by fecha_hora desc,nombre";
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
    var sqlStatement = "insert into eventos (nombre,lugar,fecha_hora,numero_maximo_acompanantes,descripcion,codigo_tipo_evento)"+
                        "values('" + evento.nombre + "','"+evento.lugar+"',CONVERT(datetime,'"+evento.fecha_hora+"'),"+evento.numero_maximo_acompanantes+",'"+evento.descripcion+"',"+evento.codigo_tipo_evento+")";
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
                       "nombre ="+evento.nombre+", "
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

exports.inviteUserToEvent = function (req, resp, codigo_evento, codigo_usuario) {
    var sqlStatement = "insert into usuarios_invitados(codigo_evento,codigo_usuario,confirmado) values " +
                       "(" + codigo_evento + "," + codigo_usuario + ",0)";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });

};

exports.inviteGroupToEvent = function (req, resp, codigo_evento, codigo_grupo) {
    var sqlStatement = "insert into usuarios_invitados (codigo_evento,codigo_usuario,confirmado) " +
                        "select " + codigo_evento + ", codigo_usuario,0 from miembros_grupo where " +
                        "codigo_grupo = " + codigo_grupo+" and not exists "+
                        "(select 'x' from usuarios_invitados ui where ui.codigo_evento = "+codigo_evento+" and " +
                        "miembros_grupo.codigo_usuario = ui.codigo_usuario)";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            resp.end();
        }
    });

};

exports.getUserInvitedEvents = function (req, resp, codigo_usuario) {
    var sqlStatement = 
                    "select e.* from Eventos e,Usuarios_Invitados ui "+
                    "where e.codigo_evento = ui.codigo_evento and "+
                    "ui.codigo_usuario = " + codigo_usuario + " and e.fecha_hora > GETDATE() and " +
                    "ui.confirmado = 0";
    console.log(sqlStatement);
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


exports.getUserConfirmedEvents = function (req, resp, codigo_usuario) {
    var sqlStatement = 
                    "select e.* from Eventos e,Usuarios_Invitados ui " +
                    "where e.codigo_evento = ui.codigo_evento and "+
                    "ui.codigo_usuario = " + codigo_usuario + " and e.fecha_hora > GETDATE() and " +
                    "ui.confirmado = 1";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.getUserFinishedEvents = function (req, resp, codigo_usuario) {
    var sqlStatement = 
                    "select e.* from Eventos e,Usuarios_Invitados ui " +
                    "where e.codigo_evento = ui.codigo_evento and "+
                    "ui.codigo_usuario = " + codigo_usuario + " and e.fecha_hora < GETDATE() and " +
                    "ui.confirmado = 1";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

    
};

exports.getInvitedUsersToEvent = function (req, resp, codigo_evento) {
    var sqlStatement = "select u.codigo_usuario, "+ 
                        "p.codigo_informacion_persona, p.nombre, p.apellidos, p.fecha_nacimiento, "+
                        "p.correo_personal, p.codigo_talla_camisa, p.cargo_jefatura, "+
                        "p.vegetariano, p.codigo_sede, p.codigo_canton, p.codigo_sub_departamento, p.cedula, "+
                        "p.correo_institucional, p.telefono_trabajo, p.numero_extension "+
                        "from usuarios_invitados ui, usuarios u, informacion_personas p "+
                        "where ui.codigo_evento ="+codigo_evento+" and ui.confirmado = 0 and "+
                        "ui.codigo_usuario = u.codigo_usuario and u.codigo_informacion_persona = p.codigo_informacion_persona ";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};

exports.getConfirmedUsersToEvent = function (req, resp, codigo_evento) {
    var sqlStatement = "select u.codigo_usuario, " + 
                        "p.codigo_informacion_persona, p.nombre, p.apellidos, p.fecha_nacimiento, " +
                        "p.correo_personal, p.codigo_talla_camisa, p.cargo_jefatura, " +
                        "p.vegetariano, p.codigo_sede, p.codigo_canton, p.codigo_sub_departamento, p.cedula, " +
                        "p.correo_institucional, p.telefono_trabajo, p.numero_extension "+
    "from usuarios_invitados ui, usuarios u, informacion_personas p "+
    "where ui.codigo_evento =" + codigo_evento + " and ui.confirmado = 1 and " +
                        "ui.codigo_usuario = u.codigo_usuario and u.codigo_informacion_persona = p.codigo_informacion_persona ";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};

