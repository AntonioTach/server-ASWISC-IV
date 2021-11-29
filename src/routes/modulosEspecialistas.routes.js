const { Router } = require('express');
const router = Router();

const modulosEspecialistasCtrl = require('../controllers/modulosEspecialista.controller');

//Registro Paciente bajo el dominio del Especialista
router.post('/registrar-paciente/', modulosEspecialistasCtrl.registrarPaciente);

module.exports = router;