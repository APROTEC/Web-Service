var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getAllGrupos = function (req, resp) {
    var sqlStatement = "select * from grupos";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};

exports.getGrupo = function (req, resp, codigo_grupo){
    var sqlStatement = "select * from grupos where codigo_grupo = " + codigo_grupo;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

}

exports.actualizarGrupos = function (req, resp, datos_grupos){
    var sqlStatement = "update grupos set descripcion_grupo = '" + datos_grupos.descripcion_grupo + "'" +
                        "where codigo_grupo = " + datos_grupos.codigo_grupo;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

}


exports.crearGrupo = function (req, resp, grupo){
    var sqlStatement = "insert into grupos (descripcion_grupo) values ('" + grupo.descripcion_grupo + "')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
}

exports.eliminarGrupo = function (req, resp, codigo_grupo) {
    var sqlStatement = "delete miembros_grupo where codigo_grupo = " + codigo_grupo + " " +
                        "delete grupos where codigo_grupo = " + codigo_grupo;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
};


exports.anadirMiembroAGrupo = function (req, resp,codigo_grupo,codigo_usuario) {
    var sqlStatement = "insert into miembros_grupo (codigo_grupo,codigo_usuario) values(" + codigo_grupo + "," + codigo_usuario + ")";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
};

exports.borrarMiembroDeGrupo = function (req, resp, codigo_grupo, codigo_usuario){
    var sqlStatement = "delete miembros_grupo where codigo_grupo = " + codigo_grupo + " and " + "codigo_usuario = " + codigo_usuario;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
};

exports.extraerInformacionGrupo = function (req, resp, codigo_grupo) {
    var sqlStatement = "select u.codigo_usuario, " +
                        "p.codigo_informacion_persona, p.nombre, p.apellidos, p.fecha_nacimiento, " +
                        "p.correo_personal, p.codigo_talla_camisa, p.cargo_jefatura, " +
                        "p.vegetariano,p.codigo_sede,p.codigo_canton,p.codigo_sub_departamento,p.cedula," +
                        "p.correo_institucional,p.telefono_trabajo,p.numero_extension " +
                        "from miembros_grupo mg, usuarios u, informacion_personas p " +
                        "where mg.codigo_grupo = " + codigo_grupo + " and mg.codigo_usuario = u.codigo_usuario " +
                        "and u.codigo_informacion_persona = p.codigo_informacion_persona";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
                       
};

