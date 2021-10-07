const { Router } = require('express');
const router = Router();

//const pool = require('../database');        //conexion a bd 

const especialistasCtrl = require('../controllers/especialistas.controller.js');


//Creacion De usuario Especialista [POST]
router.post('/registro/', especialistasCtrl.createEspecialista);

router.get('/registro/', especialistasCtrl.getEspecialistas);


router.get('/:id', especialistasCtrl.getEspecialista);

router.put('/:id', especialistasCtrl.editEspecialista);

router.delete('/:id', especialistasCtrl.deleteEspecialista);

module.exports = router;
