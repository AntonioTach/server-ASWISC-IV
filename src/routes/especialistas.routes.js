const { Router } = require('express');
const router = Router();

//const pool = require('../database');        //conexion a bd 

const especialistasCtrl = require('../controllers/especialistas.controller.js');


//Creacion De usuario Especialista [POST]
router.post('/registro/', especialistasCtrl.createEspecialista);

//Listar todos los Especialistas [GET]
router.get('/', especialistasCtrl.listarEspecialistas);

//Buscar usuario Especialista por su id [GET]
router.get('/:id', especialistasCtrl.getEspecialista);

//Editar usuario Especialista por su id [PUT]
router.put('/:id', especialistasCtrl.editEspecialista);

//Eliminar usuario Especialista por su id [DELETE]
router.delete('/:id', especialistasCtrl.deleteEspecialista);

//Login Cualquier USUARIO [POST]
router.post('/login', especialistasCtrl.signin);

module.exports = router;
