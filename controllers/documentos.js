var multer = require('multer');
var azure = require('azure-storage');
var accessKey = 'oPw8u467sDlAUVXfimoazOMOqGHVfsxJfj1ZtkcxCWvJ/iBHZhvJp9bMKK73TOaFCurC37eUltbRgVluH7XhCg==';
var storageAccount = 'aprotecmedia';
var containerName = 'documentos';
var error = require('./error.js');
var queryReturn = require('./queryReturn.js');
var db = require("../core/db");
var fs = require('fs');
const path = require('path');



var fileName = '';
var documentId = 0;




updateDocument = function () {
    var sqlStatement = "update actas set link_acta = 'aprotecmedia.blob.core.windows.net/documentos/" + fileName + "' where codigo_acta = " + documentId;
    db.executeSql(sqlStatement, function (data, err) {
        //fs.unlinkSync('../uploads/' + fileName);
      
    });
};


loadDocumentAzure = function (req, resp) {  
    var blobService = azure.createBlobService(storageAccount, accessKey);
    var filePath = __dirname+'/../uploads/'+fileName;
    //console.log(filePath);
    blobService.createAppendBlobFromLocalFile(containerName, fileName,filePath , function (err, result, response) {
        if(err)
        {
            //console.log(err);
        }
        if(result){
            //console.log(result);
        }
        updateDocument();
        
    });

};


getDocumentId = function (req, res) {
     
    var sqlStatement = "select IDENT_CURRENT('actas') as id";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, res);
        }
        else {
            documentId = data[0].id;
            queryReturn.displayDataSet(data, res);

        }
    });

};


insertDocumento = function (req, res, documento) {
   // console.log(documento);

    var sqlStatement = "insert into actas (nombre_acta,descripcion_acta)" +
                        "values('" + documento.nombre_acta + "','" + documento.descripcion_acta + "')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
     
            error.displayError(err, res);
        }
        else {
            fileName = documento.fileName;
            this.loadDocumentAzure(req,res);
            this.getDocumentId(req,res);
        }
    });

};


exports.loadDocument = function (req, res, documento) {
   insertDocumento(req,res,documento);
   
};

exports.deleteDocument = function (req, res, documentId) {
    var sqlStatement = "delete actas_usuarios where codigo_acta = " + documentId + " ";
    sqlStatement = sqlStatement + " delete actas where codigo_acta = " + documentId + "";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, res);
        }
    });

};

exports.getDocuments = function (req, res){
    var sqlStatement = "select * from actas";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, res);
        }
    });
}

exports.getDocument = function (req, res,codigo_acta) {
    var sqlStatement = "select * from actas where codigo_acta = "+codigo_acta;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, res);
        }
    });
}






