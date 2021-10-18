const { Router } = require('express');
const router = Router();

//const pool = require('../database');        //conexion a bd 

const pacienteCtrl = require('../controllers/pacientes.controller');


//Creacion De usuario Paciente [POST]
router.post('/registro/', pacienteCtrl.createPaciente);

//Listar todos los Pacientes [GET]
router.get('/', pacienteCtrl.listarPacientes);

//Buscar usuario Paciente por su id [GET]
router.get('/:id', pacienteCtrl.getPaciente);

//Editar usuario Paciente por su id [PUT]
router.put('/:id', pacienteCtrl.editPaciente);

//Eliminar usuario Paciente por su id [DELETE]
router.delete('/:id', pacienteCtrl.deletePaciente);

//Login [POST]
router.post('', pacienteCtrl.signin);

module.exports = router;
