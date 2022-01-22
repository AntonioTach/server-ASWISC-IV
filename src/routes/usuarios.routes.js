const { Router } = require('express');
const router = Router();

const usuariosCtrl = require('../controllers/usuarios.controller');

//Creacion de usuarios [POST]
router.post('/registro-especialista/', usuariosCtrl.createEspecialista);
router.post('/registro-paciente/', usuariosCtrl.createPaciente);

//Obtener Todos los usuarios por su tipo (especialistas y pacientes) [GET]
router.get('/buscar-Especialistas/', usuariosCtrl.listarEspecialistas);
router.get('/buscar-Pacientes/', usuariosCtrl.listarPacientes);

//Obtener Un Usuario por su TIPO e ID (especialistas y pacientes) [GET]
router.get('/buscar-Especialista/:id', usuariosCtrl.buscarEspecialista);
router.get('/buscar-Paciente/:id', usuariosCtrl.buscarPaciente);

//Editar un usuario por su Tipo e ID [PUT]
router.get('/editar-Especialista/:id', usuariosCtrl.editEspecialista);
router.post('/editar-Paciente/:id', usuariosCtrl.editPaciente);
//Dejar en null el campo del ID_ESPECIALISRA[PUT]
router.get('/eli-paciente/:id', usuariosCtrl.deletePacienteFromEspecialista)
//Eliminar un usuario por su Tipo e ID [DELETE]
router.delete('/eliminar-Especialista/:id', usuariosCtrl.deleteEspecialista);
//Eliminar el id del especialista en e
router.delete('/eliminar-Paciente/:id', usuariosCtrl.deletePaciente);

//Login Cualquier USUARIO [POST]
router.post('/login', usuariosCtrl.signin);
//Verify Token
router.get('/token', usuariosCtrl.verifyToken);

//Buscar Correo Repetido
router.get('/correo-repetido', usuariosCtrl.buscarCorreoRepetido);
router.get('/correo-repetido-especialista', usuariosCtrl.buscarCorreoRepetidoEspecialista);

module.exports = router;