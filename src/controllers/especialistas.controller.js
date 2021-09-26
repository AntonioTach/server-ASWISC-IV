const especialistasCtrl = {}

const Especialista = require('../models/especialista');

especialistasCtrl.getEspecialistas = (req, res) => {
    res.send('get especialistas');
}       
especialistasCtrl.createEspecialista = (req, res) => {
    res.send('create especialistas');
}
especialistasCtrl.getEspecialista = (req, res) => {}     
especialistasCtrl.editEspecialista = (req, res) => {} 
especialistasCtrl.deleteEspecialista = (req, res) => {}         



module.exports = especialistasCtrl;