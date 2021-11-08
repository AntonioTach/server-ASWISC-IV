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
router.get('/editar-Paciente/:id', usuariosCtrl.editPaciente);

//Eliminar un usuario por su Tipo e ID [DELETE]
router.delete('/eliminar-Especialista/:id', usuariosCtrl.deleteEspecialista);
router.delete('/eliminar-Paciente/:id', usuariosCtrl.deletePaciente);

//Login Cualquier USUARIO [POST]
router.post('/login',usuariosCtrl.signin);
//Verify Token
router.get('/token', usuariosCtrl.verifyToken);
module.exports = router;