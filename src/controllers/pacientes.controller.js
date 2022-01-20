const pool = require('../database');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const e = require('express');
const { response } = require('express');
const { query } = require('../database');

const pacientesCtrl = {};

pacientesCtrl.createPaciente = async (req, res) => {
    //console.log(req.body);

    //Tipo 2 = Paciente
    const { usuario, contrasena, id_tipo = 2 } = req.body;
    const { nombre, email, nacimiento, telefono } = req.body;
    //insert en usuarios 
    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    let sqlPacientes = `INSERT INTO pacientes(id_usuario, nombre,  email, nacimiento, telefono) values (LAST_INSERT_ID(), '${nombre}', '${email}',  '${nacimiento}', '${telefono}')`;
    await pool.query(sqlPacientes);
}

//Listar todos los Pacientes
pacientesCtrl.listarPacientes = async (req, res) => {
    const { id } = req.params;
    const pacientes = await pool.query('SELECT * FROM Pacientes p INNER JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE p.id_especialista  =?', [id]);
    console.log(pacientes);
    res.send(pacientes)
}

//Obtener Paciente por id
pacientesCtrl.getPaciente = (req, res) => {

}

//Editar Paciente por id
pacientesCtrl.editPaciente = (req, res) => {
    res.send({ message: 'Actualizando Paciente ' + req.params.id })
}

//Eliminar Paciente por id
pacientesCtrl.deletePaciente = (req, res) => {
    res.send({ message: 'Eliminando Paciente ' + req.params.id })

}

//Ingreso de sesion
pacientesCtrl.signin = (req, res) => { }



module.exports = pacientesCtrl;