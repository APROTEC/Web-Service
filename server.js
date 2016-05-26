var http = require('http');
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
var opciones_acompanantes = require('./controllers/opcion_acompanantes.js')
var usuarios_invitados = require('./controllers/usuarios_invitados.js')
var documentos = require('./controllers/documentos.js')
var documentos_usuarios = require('./controllers/actas_usuarios.js')
var passwordRetriever = require('./controllers/RecuperadorDeContrasenas.js');
var photos = require('./controllers/fotos.js');
var emailManager = require('./controllers/emaIlManager.js');
var comentarios = require('./controllers/Comentarios.js');
var evento_opciones_acompanantes = require('./controllers/evento_opcion_acompanantes.js');
var acompanantes_usuarios = require('./controllers/usuarios_acompanantes.js');
var encuestas = require('./controllers/encuestas.js');
var encuestas_usuarios = require('./controllers/encuestas_usuarios.js');
var eventos_documentos = require('./controllers/eventos_documentos.js');

var bodyParser = require('body-parser')





app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});


app.get('/eventos_documentos/:codigo_evento', function (req, res) {
    eventos_documentos = requireUncached('./controllers/eventos_documentos.js');
    eventos_documentos.getAllDocumentsFromEvents(req, res, req.params.codigo_evento);
});

app.post('/eventos_documentos/:evento_documento', function (req, res) {
    eventos_documentos = requireUncached('./controllers/eventos_documentos.js');
    eventos_documentos.insertDocumentoEvento(req, res, JSON.parse(req.params.evento_documento));
});


app.delete('/eventos_documentos/:codigo_evento_documento', function (req, res) {
    eventos_documentos = requireUncached('./controllers/eventos_documentos.js');
    eventos_documentos.deleteDocumentoEvento(req, res, req.params.codigo_evento_documento);
});

app.get('/encuestas_usuarios/encuesta/:codigo_encuesta', function (req, res) {
    encuestas_usuarios.getAllUsariosFromEncuesta(req, res, req.params.codigo_encuesta);
});

app.get('/encuestas_usuarios/usuario/:codigo_usuario', function (req, res) {
    encuestas_usuarios.getAllSurveysFromUser(req, res, req.params.codigo_usuario);
});

app.post('/encuestas_usuarios/usuario/:codigo_encuesta-:codigo_usuario', function (req, res) {
    encuestas_usuarios.insertUsuario(req, res, req.params.codigo_encuesta, req.params.codigo_usuario);
});

app.post('/encuestas_usuarios/grupos/:codigo_encuesta-:codigo_grupo', function (req, res) { 
    encuestas_usuarios.insertGroup(req, res, req.params.codigo_encuesta, req.params.codigo_grupo);
});

app.delete('/encuestas_usuarios/:codigo_encuesta-:codigo_usuario', function (req, res) {

    encuestas_usuarios.deleteUsuario(req, res, req.params.codigo_encuesta, req.params.codigo_usuario);
});


app.get('/encuestas/', function (req, res) {
    encuestas.getAllEncuestas(req, res);
});

app.get('/encuestas/:codigo_encuesta', function (req, res) {
    encuestas.getEncuesta(req, res, req.params.codigo_encuesta);
});

app.post('/encuestas/:encuesta', function (req, res) {
    encuestas.insertEncuesta(req, res, JSON.parse(req.params.encuesta));
});

app.put('/encuestas/:encuesta', function (req, res) {
    encuestas.updateEncuesta(req, res, JSON.parse(req.params.encuesta));
});

app.delete('/encuestas/:codigo_encuesta', function (req, res) {
    encuestas.deleteEncuesta(req, res, req.params.codigo_encuesta);
});

app.get('/usuarios_acompanantes/:codigo_evento-:codigo_usuario', function (req, res) {
    acompanantes_usuarios.getAllUserGuests(req, res, req.params.codigo_evento, req.params.codigo_usuario);
});

app.post('/usuarios_acompanantes/:acompanante_usuario', function (req, res) {
    acompanantes_usuarios.insertAcompanante(req, res, JSON.parse(req.params.acompanante_usuario));
});


app.get('/evento_acompanantes/:codigo_evento',function (req, res) {
    evento_opciones_acompanantes.getAllEventosOpcionAcompanantes(req, res, req.params.codigo_evento);
});


app.post('/evento_acompanantes/:evento_opcion_acompanante', function (req, res) {
    evento_opciones_acompanantes.insertEvento_Opcion_Acompanante(req, res, JSON.parse(req.params.evento_opcion_acompanante));
});

app.delete('/evento_acompanantes/:evento_opcion_acompanante', function (req, res) {
    evento_opciones_acompanantes.deleteEvento_Opcion_Acompanante(req, res, JSON.parse(req.params.evento_opcion_acompanante));
});

app.get('/comentarios/:codigo_evento', function (req, res) {
    comentarios.getAllCommentsFromEvent(req, res, req.params.codigo_evento);
});


app.post('/comentarios/:comentario', function (req, res) {
    comentarios.insertComment(req, res, JSON.parse(req.params.comentario));
});

app.delete('/comentarios/:codigo_comentario', function (req, res) {
    comentarios.deleteComment(req, res,req.params.codigo_comentario);
});



app.get('/actas_usuarios/usuario/:codigo_usuario', function (req, res) {
    documentos_usuarios.getUserDocuments(req, res, req.params.codigo_usuario);
});

app.get('/actas_usuarios/actas/:codigo_acta', function (req, res) {
    documentos_usuarios.getDocumentInvitations(req, res, req.params.codigo_acta);
});

app.post('/actas_usuarios/usuario/:codigo_acta-:codigo_usuario', function (req, res) { 
    documentos_usuarios.insertUser(req, res,req.params.codigo_acta, req.params.codigo_usuario);
});

app.post('/actas_usuarios/grupo/:codigo_acta-:codigo_grupo', function (req, res) { 
    documentos_usuarios.insertGroupIntoDocument(req, res, req.params.codigo_acta, req.params.codigo_grupo);
});

app.delete('/actas_usuarios/:codigo_acta-:codigo_usuario', function (req, res) {
    documentos_usuarios.deleteUserDocument(req, res, req.params.codigo_acta, req.params.codigo_usuario);
});


app.post('/actas/:acta', function (req, res) {
    documentos = requireUncached('./controllers/documentos.js');
    documentos.loadDocument(req, res, JSON.parse(req.params.acta));
    
});


app.get('/actas/', function (req, res) {
    documentos = requireUncached('./controllers/documentos.js');
    documentos.getDocuments(req, res);
});


app.get('/actas/:codigo_acta', function (req, res) {
    documentos = requireUncached('./controllers/documentos.js');
    documentos.getDocument(req, res,req.params.codigo_acta);
});


app.delete("/actas/:codigo_acta", function (req, res) {
    documentos = requireUncached('./controllers/documentos.js');
    documentos.deleteDocument(req, res, req.params.codigo_acta);
});

app.get('/usuarios/loginA/:user_name-:password', function (req, res) {
	usuarios.loginAsAdmin(req, res, req.params.user_name, req.params.password);
});


app.post('/usuarios/:usuario', function (req, res) {
    usuarios.insertNewUser(req, res, JSON.parse(req.params.usuario));
});

app.delete('/usuarios/:usuario', function (req, res) {
    usuarios.deleteUser(req, res, req.params.usuario);
});

app.get('/usuarios/loginU/:user_name-:password', function (req, res) {
    usuarios.loginAsUser(req, res, req.params.user_name, req.params.password);
});

app.put('/usuarios/cambiar_contrasena/:codigo_usuario-:password', function (req, res) {
    usuarios.changePassword(req, res, req.params.codigo_usuario, req.params.password);
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


app.delete('/eventos/:evento', function (req, res) {
    eventos.deleteEvento(req, res, req.params.evento);
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

app.get('/grupos/count_miembros/:codigo_grupo', function (req, res){
    grupos.getNumeroMiembros(req, res, req.params.codigo_grupo);
})

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

app.get('/grupos/count/:codigo_grupo', function (req, res) {
    grupos.getNumeroMiembros(req, res, req.params.codigo_grupo);
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

app.get('/opciones_acompanantes/', function (req, res) {
    opciones_acompanantes.getAllOpcionesAcompanantes(req, res);

});

app.get('/opciones_acompanantes/:codigo_opcion_acompanante', function (req, res) {
    opciones_acompanantes.getOpcionAcompanante(req, res,req.params.codigo_opcion_acompanante);

});

app.post('/opciones_acompanantes/:opcion_acompanante', function (req, res) {
    opciones_acompanantes.insertOpcionAcompanante(req, res, JSON.parse(req.params.opcion_acompanante));
});

app.put('/opciones_acompanantes/:opcion_acompanante', function (req, res) {
    opciones_acompanantes.actualizarOpcionAcompanante(req, res, JSON.parse(req.params.opcion_acompanante));
});

app.put('/usuarios_invitados/:usuario_invitado', function (req, res) {
    usuarios_invitados.updateUsuario_Invitado(req, res, JSON.parse(req.params.usuario_invitado));
});

app.delete('/usuarios_invitados/:usuario_invitado', function (req, res) {
    usuarios_invitados.delete_invitado(req, res, JSON.parse(req.params.usuario_invitado));
});

app.get('/usuarios_invitados/count_invitados/:codigo_evento', function (req, res) {
    usuarios_invitados.getCantidadInvitados(req, res, req.params.codigo_evento);
});

app.get('/usuarios_invitados/count_confirmados/:codigo_evento', function (req, res) {
    usuarios_invitados.getCantidadInvitadosConfirmados(req, res, req.params.codigo_evento);
});

app.get('/usuarios_invitados/count_acompanantes/:codigo_evento', function (req, res) {
    usuarios_invitados.getCantidadAcompanantes(req, res, req.params.codigo_evento);
});

app.get('/usuario_valido/:username', function (req, res) {
    usuarios.getUsuarioValido(req, res, req.params.username);
});


app.get('/eventos/invitacion_usuario/:codigo_usuario', function (req, res) {
    eventos.getUserInvitedEvents(req, res, req.params.codigo_usuario);
});

app.get('/eventos/confirmacion_usuario/:codigo_usuario', function (req, res) {
    eventos.getUserConfirmedEvents(req, res, req.params.codigo_usuario);
});


app.get('/eventos/finalizados_usuario/:codigo_usuario', function (req, res) {
    eventos.getUserFinishedEvents(req, res, req.params.codigo_usuario);
});

app.get('/eventos/lista_invitados/:codigo_evento', function (req, res) {
    eventos.getInvitedUsersToEvent(req, res, req.params.codigo_evento);
});

app.get('/eventos/lista_confirmados/:codigo_evento', function (req, res) {
    eventos.getConfirmedUsersToEvent(req, res, req.params.codigo_evento);
});

app.post('/usuarios/recuperar_contrasena/:nombre_usuario', function (req, res) {
    passwordRetriever.enviarPassword(req, res, req.params.nombre_usuario);
});

app.post('/photos/:codigo_informacion_persona'/*,multer({ dest: './uploads/' },filename:).single('upl')*/, function (req, res){
    photos = requireUncached('./controllers/fotos.js');
    photos.loadPhoto(req, res, req.params.codigo_informacion_persona);
});


app.post('/email/:asunto/:destinatarios/:texto', function (req, res) {
    emailManager.sendMails(req, res, req.params.asunto, req.params.destinatarios, req.params.texto);

});


function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}


var server = app.listen(8081, function () {
	
	var host = server.address().address
	var port = server.address().port
	
	console.log("Example app listening at http://%s:%s", host, port)

});