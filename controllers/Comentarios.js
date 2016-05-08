var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")



exports.getAllCommentsFromEvent = function (req, resp, codigo_evento) {
    var sqlStatement = "select * from comentarios where codigo_evento = " + codigo_evento +
                        " order by codigo_comentario";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });

};

exports.insertComment = function (req, resp, comentarioData) {
    var sqlStatement = "insert into comentarios (codigo_usuario,comentario,codigo_evento) values " +
                        "(" + comentarioData.codigo_usuario + ",'" + comentarioData.comentario + "'," + comentarioData.codigo_evento + ")";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });


};

exports.deleteComment = function (req, resp, codigo_comentario) {
    var sqlStatement = "delete comentarios where codigo_comentario = " + codigo_comentario;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });

};



