const { Router } = require('express');
const horariosCtrl = require('../controllers/horarios.controller');
const router = Router();

//Generacion de Llamada [POST]
router.post('/horarios/', horariosCtrl.generarVideollamada);

router.post('/addSession/:id', horariosCtrl.addSession);

router.delete('/deleteSession/:id', horariosCtrl.deleteSession);

router.get('/get-citas-especialista/:id', horariosCtrl.getCitasEspecialista);


module.exports = router;