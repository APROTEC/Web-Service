var multer = require('multer');
var azure = require('azure-storage');
var accessKey = 'oPw8u467sDlAUVXfimoazOMOqGHVfsxJfj1ZtkcxCWvJ/iBHZhvJp9bMKK73TOaFCurC37eUltbRgVluH7XhCg==';
var storageAccount = 'aprotecmedia';
var containerName = 'documentos';
var error = require('./error.js');
var queryReturn = require('./queryReturn.js');
var db = require("../core/db");
var fs = require('fs');


var fileName = '';
var documentId = 0;
var storage = multer.diskStorage({
 //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        fileName = documentId+"-"+file.originalname;
        cb(null, fileName);
        
    }
});

var upload = multer({
 //multer settings
    storage: storage
}).single('file');



updateDocument = function () {
    var sqlStatement = "update actas set link_acta = 'aprotecmedia.blob.core.windows.net/documentos/" + fileName + "' where codigo_acta = " + documentId;
    db.executeSql(sqlStatement, function (data, err) {
        fs.unlinkSync('.//uploads//' + fileName);
      
    });
};


loadDocumentAzure = function (req, resp) {  
    var blobService = azure.createBlobService(storageAccount, accessKey);
    blobService.createAppendBlobFromLocalFile(containerName, fileName, './/uploads//'+fileName, function (err, result, response) {
      
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
            upload(req, res, function (err) {
                if (err) {
                    res.json({ error_code: 1, err_desc: err });
                    return;
                }
                res.json({ error_code: 0, err_desc: null });
                loadDocumentAzure(req, res);
            });
        }
    });

};


insertDocumento = function (req, res, documento) {
    console.log('hola');

    var sqlStatement = "insert into actas (nombre_acta,descripcion_acta)" +
                        "values('" + documento.nombre_acta + "','" + documento.descripcion_acta + "')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
     
            error.displayError(err, res);
        }
        else {
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






