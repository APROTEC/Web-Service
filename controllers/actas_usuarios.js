var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")

exports.insertUser = function (req, res, codigo_acta, codigo_usuario){
    var sqlStatement = "insert into actas_usuarios (codigo_acta,codigo_usuario) values (" + codigo_acta + "," + codigo_usuario + ")";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, res);
        }
        else {
            queryReturn.displayDataSet(1, res);
        }
    });
}

exports.getUserDocuments = function (req, res, codigo_usuario) {
    var sqlStatement = "select a.* from actas a,actas_usuarios au where au.codigo_usuario = "+codigo_usuario+
                       " and a.codigo_acta = au.codigo_acta";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, res);
        }
        else {
            queryReturn.displayDataSet(data, res);
        }
    });
}

exports.getDocumentInvitations = function (req, res, codigo_acta) {
    var sqlStatement = "select u.*,i.* from usuarios u,informacion_personas i,actas_usuarios au" +
                        " where au.codigo_acta = " + codigo_acta + " and au.codigo_usuario = u.codigo_usuario and " +
                        " u.codigo_informacion_persona = i.codigo_informacion_persona";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, res);
        }
        else {
            queryReturn.displayDataSet(data, res);
        }
    });
}

exports.deleteUserDocument = function (req, res,codigo_acta, codigo_usuario) {
    var sqlStatement = "delete actas_usuarios where codigo_usuario = "+ codigo_usuario+" and "+
                       "codigo_acta = "+ codigo_acta;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, res);
        }
        else {
            queryReturn.displayDataSet(1, res);
        }
    });

};


exports.insertGroupIntoDocument = function (req, res,codigo_acta, codigo_grupo){
    var sqlStatement = "insert into actas_usuarios (codigo_acta,codigo_usuario) " +
                            "select " + codigo_acta + ", codigo_usuario from miembros_grupo where " +
                            "codigo_grupo = " + codigo_grupo + " and not exists " +
                            "(select 'x' from actas_usuarios au where au.codigo_acta = " + codigo_acta + " and " +
                            "miembros_grupo.codigo_usuario = au.codigo_usuario)";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, res);
        }
        else {
            queryReturn.displayDataSet(1, res);
        }
    });
    }