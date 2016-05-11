var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getAllUsariosFromEncuesta = function (req, resp,codigo_encuesta) {
    var sqlStatement = "select u.codigo_usuario, " + 
                        "p.codigo_informacion_persona,p.foto ,p.nombre, p.apellidos, p.fecha_nacimiento, " +
                        "p.correo_personal, p.codigo_talla_camisa, p.cargo_jefatura, " +
                        "p.vegetariano, p.codigo_sede, p.codigo_canton, p.codigo_sub_departamento, p.cedula, " +
                        "p.correo_institucional, p.telefono_trabajo, p.numero_extension " +
                        "from encuestas_usuarios eu, usuarios u, informacion_personas p " +
                        "where eu.codigo_encuesta =" + codigo_encuesta + "  and " +
                        "eu.codigo_usuario = u.codigo_usuario and u.codigo_informacion_persona = p.codigo_informacion_persona ";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


exports.insertUsuario = function (req, resp, codigo_encuesta, codigo_usuario) {
    var sqlStatement = "insert into encuestas_usuarios (codigo_encuesta,codigo_usuario) values " +
                        "(" + codigo_encuesta + "," + codigo_usuario + ")";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

};

exports.deleteUsuario = function (req, resp, codigo_encuesta, codigo_usuario){
    var sqlStatement = "delete encuestas_usuarios where codigo_encuesta = " + codigo_encuesta + " and codigo_usuario = " + codigo_usuario;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
}

exports.insertGroup = function (req, resp, codigo_encuesta, codigo_grupo) {
    var sqlStatement = "insert into encuestas_usuarios (codigo_encuesta,codigo_usuario) " +
                        "select " + codigo_encuesta + ", codigo_usuario from miembros_grupo where " +
                        "codigo_grupo = " + codigo_grupo + " and not exists " +
                        "(select 'x' from encuestas_usuarios eu where eu.codigo_encuesta = " + codigo_encuesta + " and " +
                        "miembros_grupo.codigo_usuario = eu.codigo_usuario)";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
};


exports.getAllSurveysFromUser = function (req, resp, codigo_usuario) {
    var sqlStatement = "select e.* " +
                        "from encuestas e, encuestas_usuarios eu " +
                        "where e.codigo_encuesta = eu.codigo_encuesta and " +
                        "eu.codigo_usuario = " + codigo_usuario;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};