const { Router } = require('express');
const router = Router();

const usuariosCtrl = require('../controllers/usuarios.controller');

//Creacion de usuarios [POST]
router.post('/registro-especialista/', usuariosCtrl.createEspecialista);
router.post('/registro-paciente/', usuariosCtrl.createPaciente);
//Creacion de usuario paciente por medio de Especialista
router.post('/registrar-paciente/', usuariosCtrl.registrarPaciente);

//Obtener Todos los usuarios por su tipo (especialistas y pacientes) [GET]
router.get('/buscar-Especialistas/', usuariosCtrl.listarEspecialistas);
router.get('/buscar-Pacientes/', usuariosCtrl.listarPacientes);

//Obtener Un Usuario por su TIPO e ID (especialistas y pacientes) [GET]
router.get('/buscar-Especialista/:id', usuariosCtrl.buscarEspecialista);
router.get('/buscar-Paciente/:id', usuariosCtrl.buscarPaciente);
router.get('/buscar-PacienteNombre/:id', usuariosCtrl.buscarPacienteNombre);

//Editar un usuario por su Tipo e ID [PUT]
router.get('/editar-Especialista/:id', usuariosCtrl.editEspecialista);
router.post('/editar-Paciente/:id', usuariosCtrl.editPaciente);
router.post('/editar-PacienteNombre/:id', usuariosCtrl.editPacienteNombre);
//Dejar en null el campo del ID_ESPECIALISRA[PUT]
router.get('/eli-paciente/:id', usuariosCtrl.deletePacienteFromEspecialista)
//Eliminar un usuario por su Tipo e ID [DELETE]
router.delete('/eliminar-Especialista/:id', usuariosCtrl.deleteEspecialista);
//Eliminar el id del especialista en e
router.delete('/eliminar-Paciente/:id', usuariosCtrl.deletePaciente);
//quitar subscripcion del paciente
router.get('/desuscribirme/:id', usuariosCtrl.inscripcionCancelada);
//Login Cualquier USUARIO [POST]
router.post('/login', usuariosCtrl.signin);
//Verify Token
router.get('/token', usuariosCtrl.verifyToken);
//agragar un paciente con el especialista
router.put('/nuevo-cliente/:id', usuariosCtrl.agregarPacienteEspecialista);
//guardar un articulo
router.post('/guardar-articulo', usuariosCtrl.guardarArticulo);
//publicar articulo
router.post('/publicar-articulo', usuariosCtrl.publicarArticulo);
//articulos
router.get('/articulos', usuariosCtrl.articulosLista);
//articulos personales
router.get('/mis-articulos/:id', usuariosCtrl.articulosPersonales);
//tomar un articulo
router.get('/articulo/:id', usuariosCtrl.tomarArticulo)
//guardar un articulo
router.put('/guardar-articulo/:id', usuariosCtrl.modificarguardarArticulo);
//publicar articulo
router.put('/publicar-articulo/:id', usuariosCtrl.modificarpublicarArticulo);
//subir prueba
router.post('/prueba', usuariosCtrl.subirPrueba);
//Buscar Correo Repetido 
router.get('/correo-repetido', usuariosCtrl.buscarCorreoRepetido);
router.get('/correo-repetido-especialista', usuariosCtrl.buscarCorreoRepetidoEspecialista);


module.exports = router;