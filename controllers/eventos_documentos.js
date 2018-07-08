var multer = require('multer');
var azure = require('azure-storage');
var accessKey = 'oPw8u467sDlAUVXfimoazOMOqGHVfsxJfj1ZtkcxCWvJ/iBHZhvJp9bMKK73TOaFCurC37eUltbRgVluH7XhCg==';
var storageAccount = 'aprotecmedia';
var containerName = 'documentos-eventos';
var error = require('./error.js');
var queryReturn = require('./queryReturn.js');
var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")
var fs = require('fs');
const path = require('path');
var fileName = '';


updateDocument = function () {
    var sqlStatement = "update eventos_documentos set link_documento = 'aprotecmedia.blob.core.windows.net/documentos-eventos/" + fileName + "' where codigo_evento_documento = " + documentId;
    db.executeSql(sqlStatement, function (data, err) {
        fs.unlinkSync('.//uploads//' + fileName);
      
    });
};


loadDocumentAzure = function (req, resp) {
    var blobService = azure.createBlobService(storageAccount, accessKey);
    var filePath = __dirname+'\\..\\uploads\\'+fileName;
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
    var sqlStatement = "select IDENT_CURRENT('eventos_documentos') as id";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            documentId = data[0].id;
            queryReturn.displayDataSet(data, res);
    });

};


insertDocument = function (req, res, documento) {
    var sqlStatement = "insert into eventos_documentos (codigo_evento,nombre_documento,link_documento)" +
                        "values('" + documento.codigo_evento+"','" + documento.nombre_documento + "','sin enlace')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            fileName = documento.fileName;
            this.loadDocumentAzure(req,res);
            this.getDocumentId(req,res);
        }
    });

};




exports.getAllDocumentsFromEvents = function (req, resp, codigo_evento) {
    var sqlStatement = "select * from eventos_documentos where codigo_evento = " + codigo_evento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(data, resp);
        }
    });
};


exports.deleteDocumentoEvento = function (req, resp, codigo_evento_documento) {
    var sqlStatement = "delete eventos_documentos " +
                       "where codigo_evento_documento = " + codigo_evento_documento;
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            queryReturn.displayDataSet(1, resp);
        }
    });
      
};

exports.insertDocumentoEvento = function (req, res, documento) {
    insertDocument(req, res, documento);
};