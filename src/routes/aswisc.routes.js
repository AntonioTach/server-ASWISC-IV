const { Router } = require('express');
const router = Router();

const aswiscCtrl = require('../controllers/aswisc.controller');

//AUTOMATIZACION ASWISC-IV [POST]
router.post('/aswisc/', aswiscCtrl.automatizarPrueba);
//GET DATOS DE AUTOMATIZACION WISC-IV [GET]
router.get('/obtenerWISC/:id', aswiscCtrl.getPrueba);

module.exports = router;