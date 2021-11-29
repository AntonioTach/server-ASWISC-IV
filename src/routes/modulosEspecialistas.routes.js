const { Router } = require('express');
const router = Router();

const modulosEspecialistasCtrl = require('../controllers/modulosEspecialista.controller');

//Registro Paciente bajo el dominio del Especialista
router.post('/registrar-paciente/', modulosEspecialistasCtrl.registrarPaciente);

//Ver Pacientes
router.get('/ver-pacientes/:id', modulosEspecialistasCtrl.verPacientes);

module.exports = router;