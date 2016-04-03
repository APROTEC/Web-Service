﻿var http = require('http');
var port = process.env.port || 1337;

var express = require('express');
var app = express();
var usuarios = require('./controllers/usuarios');
var grados_academicos = require('./controllers/grados_academicos')
var personas = require('./controllers/informacion_personas')
var cantones = require('./controllers/cantones')
var provincias = require('./controllers/provincias.js')
var sedes = require('./controllers/sedes.js')
var sub_departamentos = require('./controllers/sub_departamentos')
var departamentos = require('./controllers/departamentos')
var tallas_camisas = require('./controllers/tallas_camisas.js')
var eventos = require('./controllers/eventos.js')
var grupos = require('./controllers/grupos.js');
var tipos_eventos = require('./controllers/tipos_eventos.js');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
});


app.get('/usuarios/loginA/:user_name-:password', function (req, res) {
	usuarios.loginAsAdmin(req, res, req.params.user_name, req.params.password);
});


app.post('/usuarios/:usuario', function (req, res) {
    usuarios.insertNewUser(req, res, JSON.parse(req.params.usuario));
});

app.get('/usuarios/loginU/:user_name-:password', function (req, res) {
    usuarios.loginAsUser(req, res, req.params.user_name, req.params.password);
});

app.get('/usuarios/:codigo_usuario', function (req, res) {
    usuarios.getUser(req, res, req.params.codigo_usuario);
});

app.get('/usuarios/', function (req, res) {
    usuarios.getAllUsers(req, res);
});

app.get('/grados_academicos_personas/:codigo_informacion_persona', function (req, res) {
    grados_academicos.getPersonAcademicGrades(req, res, req.params.codigo_informacion_persona);
});

app.get('/grados_academicos_personas/n/:codigo_informacion_persona', function (req, res) {
    grados_academicos.getAllAcademicGradesAPersonDoesNotHave(req, res, req.params.codigo_informacion_persona);
});

app.get('/grados_academicos/', function (req, res) {
    grados_academicos.getAllAcademicGrades(req, res);
});

app.delete('/grados_academicos_personas/:codigo_informacion_persona-:codigo_grado_academico', function (req, res) {
    grados_academicos.deleteAcademicGradesFromPerson(req, res, req.params.codigo_informacion_persona, req.params.codigo_grado_academico);
});

app.post('/grados_academicos_personas/:codigo_informacion_persona-:codigo_grado_academico', function (req, res) {
    grados_academicos.insertAcademicGradePerson(req, res, req.params.codigo_informacion_persona, req.params.codigo_grado_academico);
});

app.get('/personas/', function (req, res) {
    personas.getAllPeopleGeneralInformation(req, res);
});

app.get('/personas/:codigo_informacion_persona', function (req, res) {
    personas.getPersonInformation(req, res,req.params.codigo_informacion_persona);
});

app.put('/personas/:persona', function (req, res) {
    personas.updateInformation(req, res, JSON.parse(req.params.persona));
});

app.get('/cantones/provincia/:codigo_provincia', function (req, res) {
    cantones.getCantonesFromProvincia(req, res, req.params.codigo_provincia);
});

app.get('/cantones/:codigo_canton', function (req, res) {
    cantones.getCanton(req, res, req.params.codigo_canton);
});

app.get('/provincias/:codigo_provincia', function (req, res) {
    provincias.getProvincia(req, res, req.params.codigo_provincia);
});

app.get('/provincias/', function (req, res) {
    provincias.getAllProvincias(req, res, req.params.codigo_provincia);
});

app.get('/sedes/:codigo_sede', function (req, res) {
    sedes.getSede(req, res, req.params.codigo_sede);
});

app.get('/sedes/', function (req, res) {
    sedes.getAllSedes(req, res);
});

app.get('/sub_departamentos/departamentos/:codigo_departamento', function (req, res) {
    sub_departamentos.getSubDepartamentosFromDepartamentos(req, res, req.params.codigo_departamento);
});

app.get('/sub_departamentos/:codigo_sub_departamento', function (req, res) {
    sub_departamentos.getSubDepartamento(req, res, req.params.codigo_sub_departamento);
});

app.get('/departamentos/:codigo_departamento', function (req, res) {
    departamentos.getDepartamento(req, res, req.params.codigo_departamento);
});

app.get('/departamentos/', function (req, res) {
    departamentos.getAllDepartamentos(req, res);
});

app.get('/tallas_camisas/', function (req, res) {
    tallas_camisas.getAllTallasCamisas(req, res);
});

app.get('/eventos/', function (req, res) {
    eventos.getAllEventos(req, res);
        
});

app.get('/eventos/:codigo_evento', function (req, res) {
    eventos.getEvento(req, res,req.params.codigo_evento);
});

app.post('/eventos/invitarUsuario/:codigo_evento-:codigo_usuario', function (req, res) {
    eventos.inviteUserToEvent(req, res,req.params.codigo_evento,req.params.codigo_usuario);
});

app.post('/eventos/invitarGrupo/:codigo_evento-:codigo_grupo', function (req, res) {
    eventos.inviteGroupToEvent(req, res,req.params.codigo_evento,req.params.codigo_grupo);
});

app.put('/eventos/:evento', function (req, res) {
    eventos.updateEvento(req, res, JSON.parse(req.params.evento));
});

app.post('/eventos/:evento', function (req, res) {
    eventos.insertEvento(req, res, JSON.parse(req.params.evento));
});


app.get('/grupos', function (req, res) {
    grupos.getAllGrupos(req, res);
});


app.get('/grupos/:codigo_grupo', function (req, res) {
    grupos.getGrupo(req, res,req.params.codigo_grupo);
});


app.put('/grupos/:grupo', function (req, res) {
    grupos.actualizarGrupos(req, res, JSON.parse(req.params.grupo));
});

app.post('/grupos/:grupo', function (req, res) {
    grupos.crearGrupo(req, res, JSON.parse(req.params.grupo));
});

app.delete('/grupos/:codigo_grupo', function (req, res) {
    grupos.eliminarGrupo(req, res, req.params.codigo_grupo);
});

app.post('/miembros_grupo/:codigo_grupo-:codigo_usuario', function (req, res) {
    grupos.anadirMiembroAGrupo(req, res, req.params.codigo_grupo, req.params.codigo_usuario);
}); 

app.delete('/miembros_grupo/:codigo_grupo-:codigo_usuario', function (req, res) {
    grupos.borrarMiembroDeGrupo(req, res, req.params.codigo_grupo, req.params.codigo_usuario);
});

app.get('/miembros_grupos/:codigo_grupo', function (req, res) {
    grupos.extraerInformacionGrupo(req,res,req.params.codigo_grupo);
});

app.get('/tipos_eventos/', function (req, res) {
    tipos_eventos.getAllTiposEventos(req, res);
});

app.get('/tipos_eventos/:codigo_tipo_evento', function (req, res) {
    tipos_eventos.getTipoEvento(req, res,req.params.codigo_tipo_evento);
});

app.post('/tipos_eventos/:tipo_evento', function (req, res) {
    tipos_eventos.crearTipoEvento(req, res, JSON.parse(req.params.tipo_evento));
});
   

app.put('/tipos_eventos/:tipo_evento', function (req, res) {
    tipos_eventos.actualizarTipoEvento(req, res, JSON.parse(req.params.tipo_evento));
});
   









var server = app.listen(8081, function () {
	
	var host = server.address().address
	var port = server.address().port
	
	console.log("Example app listening at http://%s:%s", host, port)

});