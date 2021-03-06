﻿var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getAllPeopleGeneralInformation = function (req, resp) {
    var sqlStatement = "select codigo_informacion_persona,foto,nombre,apellidos,fecha_nacimiento, " +
                        "correo_personal, codigo_talla_camisa, cargo_jefatura, " +
                        "vegetariano,codigo_sede,codigo_canton,codigo_sub_departamento,cedula," +
                        "correo_institucional,telefono_trabajo,numero_extension "+
                        "from informacion_personas " +
                        'order by nombre,apellidos asc';
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
    

};


exports.updateInformation = function (req, resp, info_data) {
    var sqlStatement = "update informacion_personas " +
                        "set correo_personal = '" + info_data.correo_personal + "' " +
                        ",fecha_nacimiento = CONVERT(date,'" + info_data.fecha_nacimiento + "' )" +
                        ",codigo_talla_camisa = '" + info_data.codigo_talla_camisa + "' " +
                        ",cargo_jefatura =" + (info_data.cargo_jefatura == true?1:0) + " " +
                        ",vegetariano = " + (info_data.vegetariano==true?1:0) + " " +
                        ",codigo_sede = " + info_data.codigo_sede + " " +
                        ",codigo_canton = " + info_data.codigo_canton + " " +
                        ",codigo_sub_departamento = " + info_data.codigo_sub_departamento + " " +
                        ",correo_institucional = '" + info_data.correo_institucional + "' " +
                        ",telefono_trabajo = '" + info_data.telefono_trabajo + "' " +
                        ",numero_extension = '" + info_data.numero_extension + "' " +
                        "where codigo_informacion_persona = " + info_data.codigo_informacion_persona + "; "+

                        "update usuarios set codigo_tipo_usuario = '"+info_data.codigo_tipo_usuario+"' "+
                        "where codigo_informacion_persona = "+ info_data.codigo_informacion_persona+" ";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

     


};


exports.getPersonInformation = function (req,resp,codigo_informacion_persona) {
    var sqlStatement = "select nombre,foto,apellidos,fecha_nacimiento, " +
                        "correo_personal, codigo_talla_camisa, cargo_jefatura, " +
                        "vegetariano,codigo_sede,codigo_canton,codigo_sub_departamento,cedula," +
                        "correo_institucional,telefono_trabajo,numero_extension,codigo_tipo_usuario " +
                        "from informacion_personas,usuarios " +
                        "where informacion_personas.codigo_informacion_persona =" + codigo_informacion_persona+
                        " and usuarios.codigo_informacion_persona = informacion_personas.codigo_informacion_persona";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

                         
};

exports.insertNewPerson = function (req, resp,user) {
    var sqlStatement = "insert into informacion_personas (codigo_informacion_persona,nombre,apellidos,correo_personal,cedula,foto) values (ident_current('usuarios')+1,'"+user.nombre+"','"+user.apellidos+"','"+user.nombre_usuario+"','" + user.cedula + "','aprotecmedia.blob.core.windows.net/photos/f3.png')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            exports.insertNewUser(req, resp, user);
            

        }
    });
};

exports.insertNewUser = function (req, resp, user) {

    var sqlStatement = "insert into usuarios (nombre_usuario,contrasena,codigo_tipo_usuario,codigo_informacion_persona,fecha_ingreso) values " +
                        "('" + user.nombre_usuario + "','" + user.contrasena + "','n',ident_current('usuarios'),GETDATE())";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

};