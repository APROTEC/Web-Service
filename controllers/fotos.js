var multer = require('multer');
var azure = require('azure-storage');
var accessKey = 'nyiXx2ANiQJ/fzBbq3DEozU3PRnDXbWFe03jtvAehq8dzIkFJZTHXZ3bjGTZNQO2WEVuyZ1/G8+7yUMG7e9IDg==';
var storageAccount = 'aprotec';
var containerName = 'photos';
var error = require('./error.js');
var queryReturn = require('./queryReturn.js');
var db = require("../core/db");
var error = require("./error");
var queryReturn = require("./queryReturn.js")
var fs = require('fs');

var fileName = '';

var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
    
        fileName = file.originalname;
        cb(null, fileName);
        
    }
});

var upload = multer({
    //multer settings
    storage: storage
}).single('upl');



updatePersonInformation = function (codigo_informacion_persona) {
    var sqlStatement = "update informacion_personas set foto = 'aprotecstorage.blob.core.windows.net/photos/" + codigo_informacion_persona + "' where codigo_informacion_persona = " + codigo_informacion_persona;
    db.executeSql(sqlStatement, function (data, err) {
        fs.unlinkSync('.//uploads//' + fileName);
      
    });
};


loadPhotoAzure = function (req, resp,codigo_informacion_persona) {
    var blobService = azure.createBlobService(storageAccount, accessKey);
    blobService.createAppendBlobFromLocalFile(containerName, codigo_informacion_persona, './/uploads//' + fileName, function (err, result, response) {
        
        updatePersonInformation(codigo_informacion_persona);
        
    });

};



deleteExistingPhoto = function (req, res, codigo_informacion_persona) {
    var blobService = azure.createBlobService(storageAccount, accessKey);
    blobService.deleteBlob(containerName, codigo_informacion_persona, function (error, response) {
        loadPhotoAzure(req, res, codigo_informacion_persona);
    });

};


updatePhoto = function (req, res,codigo_informacion_persona) {
    
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
        deleteExistingPhoto(req,res,codigo_informacion_persona)
        });

};




exports.loadPhoto = function (req, res, codigo_informacion_persona) {
    updatePhoto(req, res, codigo_informacion_persona);
   
};







