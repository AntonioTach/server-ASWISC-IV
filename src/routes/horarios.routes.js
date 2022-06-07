const { Router } = require('express');
const horariosCtrl = require('../controllers/horarios.controller');
const router = Router();

//Generacion de Llamada [POST]
router.post('/horarios/', horariosCtrl.generarVideollamada);

router.post('/addSession/:id', horariosCtrl.addSession);

router.delete('/deleteSession/:id', horariosCtrl.deleteSession);

router.get('/get-citas-especialista/:id', horariosCtrl.getCitasEspecialista);

router.get('/get-citas-especialista-paciente/:id', horariosCtrl.getCitasEspecialistaPaciente);

router.post('/addSessionPaciente/:id', horariosCtrl.addSessionPaciente);

router.delete('/delete-session-paciente/:id', horariosCtrl.deleteSessionPaciente);

router.post('/paymentIntent/', horariosCtrl.createPaymentIntent);

module.exports = router;