modulosEspecialistasCtrl = {};

const pool = require('../database');
const e = require('express');
const { response } = require('express');

//Registro Paciente bajo el dominio del Especialista
modulosEspecialistasCtrl.registrarPaciente = async (req, res) => {
//Tipo 2 = Paciente
const{usuario, contrasena, id_tipo=2} = req.body;
const{nombre, sexo, email, nacimiento, telefono} = req.body;

};

module.exports = modulosEspecialistasCtrl;