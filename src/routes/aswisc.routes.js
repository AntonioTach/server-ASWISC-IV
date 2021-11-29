const { Router } = require('express');
const router = Router();

const aswiscCtrl = require('../controllers/aswisc.controller');

//AUTOMATIZACION ASWISC-IV [POST]
router.post('/aswisc/', aswiscCtrl.automatizarPrueba);

module.exports = router;