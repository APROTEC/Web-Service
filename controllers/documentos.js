var multer = require('multer');
var azure = require('azure-storage');
var accessKey = 'nyiXx2ANiQJ/fzBbq3DEozU3PRnDXbWFe03jtvAehq8dzIkFJZTHXZ3bjGTZNQO2WEVuyZ1/G8+7yUMG7e9IDg==';
var storageAccount = 'aprotec';
var containerName = 'documentos';
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
        fileName = documentId+"-"+file.originalname;
        cb(null, fileName);
        
    }
});

var upload = multer({
 //multer settings
    storage: storage
}).single('file');



updateDocument = function () {
    var sqlStatement = "update actas set link_acta = 'aprotecstorage.blob.core.windows.net/documentos/" + fileName + "' where codigo_acta = " + documentId;
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
            error.displayError(err, resp);
        }
        else {
            documentId = data[0].id;
            console.log('hola '+documentId);
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


insertDocument = function (req, res, documento) {
    console.log(documento.nombre_acta);
    console.log(documento.descripcion_acta);
    var sqlStatement = "insert into actas (nombre_acta,descripcion_acta)" +
                        "values('" + documento.nombre_acta + "','" + documento.descripcion_acta + "')";
    db.executeSql(sqlStatement, function (data, err) {
        if (err) {
            console.log('llegue aki error');
            error.displayError(err, resp);
        }
        else {
            console.log('llegue aki');
            getDocumentId(req,res);
        }
    });

};


exports.loadDocument = function (req, res, documento) {
    console.log('hola');
   insertDocument(req,res,documento);
   
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






