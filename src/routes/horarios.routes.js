const { Router } = require('express');
const router = Router();

const horariosCtrl = require('../controllers/horarios.controller');

router.post('/agendar/', horariosCtrl.AgendarCita);

module.exports = router;