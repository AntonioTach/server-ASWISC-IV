const { Router } = require('express');
const router = Router();

//const pool = require('../database');        //conexion a bd 

const especialistasCtrl = require('../controllers/especialistas.controller.js');


//Creacion De usuario Especialista [POST]
router.post('/registro/', especialistasCtrl.createEspecialista);


router.get('/registro/', especialistasCtrl.getEspecialistas);

//Buscar usuario Especialista por su id
router.get('/:id', especialistasCtrl.getEspecialista);

//Editar usuario Especialista por su id
router.put('/:id', especialistasCtrl.editEspecialista);

//Eliminar usuario Especialista por su id
router.delete('/:id', especialistasCtrl.deleteEspecialista);

//Login 
router.post('', especialistasCtrl.signin);

module.exports = router;
