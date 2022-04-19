const { Router } = require('express');
const horariosCtrl = require('../controllers/horarios.controller');
const router = Router();

//Generacion de Llamada [POST]
router.post('/horarios/', horariosCtrl.generarVideollamada);


module.exports = router;