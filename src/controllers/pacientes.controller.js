const pool = require('../database');
const mysql = require('mysql');

const pacientesCtrl = {};

pacientesCtrl.createPaciente = async (req, res) => 
{
    console.log(req.body);
    await pool.query('INSERT INTO pacientes set ?', [req.body]);
    res.send({message: 'Paciente creado!'});
}

//Listar todos los Pacientes
pacientesCtrl.listarPacientes = async (req, res) => 
{
    await pool.query('SELECT * FROM Pacientes');
}

//Obtener Paciente por id
pacientesCtrl.getPaciente = (req, res) => {

}   

//Editar Paciente por id
pacientesCtrl.editPaciente = (req, res) => {
    res.send({message: 'Actualizando Paciente ' + req.params.id})
} 

//Eliminar Paciente por id
pacientesCtrl.deletePaciente = (req, res) => {
    res.send({message: 'Eliminando Paciente ' + req.params.id})

}   

//Ingreso de sesion
pacientesCtrl.signin = (req,res) => {}



module.exports = pacientesCtrl;