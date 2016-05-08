
var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")


exports.getPersonAcademicGrades = function (req, resp, codigo_informacion_persona) {
    var sqlStatement = "select gap.codigo_grado_academico,ga.nivel_especializacion,ga.campo_estudio " +
                        "from grados_academicos_personas gap, grados_academicos ga " +
                        "where gap.codigo_informacion_persona = " + codigo_informacion_persona + " and " +
                        "gap.codigo_grado_academico = ga.codigo_grado_academico"+
                        " order by ga.nivel_especializacion,ga.campo_estudio asc";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
                        

};
exports.getAllAcademicGrades = function (req, resp) {
    var sqlStatement = "select * from grados_academicos";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};

exports.deleteAcademicGradesFromPerson = function (req, resp, codigo_informacion_persona, codigo_grado_academico) {
    var sqlStatement = "delete grados_academicos_personas where codigo_informacion_persona = "+codigo_informacion_persona+" and codigo_grado_academico ="+codigo_grado_academico;
    db.executeSql(sqlStatement, function (err, results) {
        if (err) {
            error.displayError(err, resp);
            
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
};


exports.insertAcademicGradePerson = function (req, resp, codigo_informacion_persona, codigo_grado_academico) {
    var sqlStatement = "insert grados_academicos_personas(codigo_grado_academico,codigo_informacion_persona) values("+codigo_grado_academico+","+codigo_informacion_persona+")";
    db.executeSql(sqlStatement, function (err, results) {
        if (err) {
            error.displayError(err, resp); 
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
};

exports.getAllAcademicGradesAPersonDoesNotHave = function (req, resp, codigo_informacion_persona) {
    var sqlStatement = "select * " +
                        "from Grados_Academicos gp " +
                        "where not exists(select 'x' " +
                        "from Grados_Academicos_Personas gap " +
                        "where gap.codigo_informacion_persona = " + codigo_informacion_persona + " and " +
                        "gap.codigo_grado_academico = gp.codigo_grado_academico)" +
                        " order by gp.nivel_especializacion,gp.campo_estudio asc";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


