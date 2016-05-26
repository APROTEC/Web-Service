var multer = require('multer');
var azure = require('azure-storage');
var accessKey = 'nyiXx2ANiQJ/fzBbq3DEozU3PRnDXbWFe03jtvAehq8dzIkFJZTHXZ3bjGTZNQO2WEVuyZ1/G8+7yUMG7e9IDg==';
var storageAccount = 'aprotec';
var containerName = 'documentos-eventos';
var error = require('./error.js');
var queryReturn = require('./queryReturn.js');
var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")
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
        fileName = documentId + "-" + file.originalname;
        cb(null, fileName);
        
    }
});

var upload = multer({
    //multer settings
    storage: storage
}).single('file');



updateDocument = function () {
    var sqlStatement = "update eventos_documentos set link_documento = 'aprotec.blob.core.windows.net/documentos-eventos/" + fileName + "' where codigo_evento_documento = " + documentId;
    db.executeSql(sqlStatement, function (data, err) {
        fs.unlinkSync('.//uploads//' + fileName);
      
    });
};


loadDocumentAzure = function (req, resp) {
    var blobService = azure.createBlobService(storageAccount, accessKey);
    blobService.createAppendBlobFromLocalFile(containerName, fileName, './/uploads//' + fileName, function (err, result, response) {
        
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


insertDocumentoEvento = function (req, res, documento) {
    var sqlStatement = "insert into eventos_documentos (codigo_evento,nombre_documento,link_documento)" +
                        "values('" + documento.codigo_evento+"','" + documento.nombre_documento + "','sin enlace')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            error.displayError(err, resp);
        }
        else {
            getDocumentId(req, res);
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