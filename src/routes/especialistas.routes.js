const { Router } = require('express');
const router = Router();

//const pool = require('../database');        //conexion a bd 

const especialistasCtrl = require('../controllers/especialistas.controller.js');

router.get('/', especialistasCtrl.getEspecialistas);

router.post('/', especialistasCtrl.createEspecialista);

router.get('/:id', especialistasCtrl.getEspecialista);

router.get('/:id', especialistasCtrl.editEspecialista);

router.delete('/:id', especialistasCtrl.deleteEspecialista);

module.exports = router;
//