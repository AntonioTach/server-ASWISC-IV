modulosEspecialistasCtrl = {};

const pool = require('../database');
const e = require('express');
const { response } = require('express');

//-----------------------Registro Paciente bajo el dominio del Especialista------------------------
modulosEspecialistasCtrl.registrarPaciente = async (req, res) => {
    //Tipo 2 = Paciente
    const { usuario, contrasena, id_tipo = 2 } = req.body;
    const { id_usuario, nombre, sexo, email, nacimiento, telefono } = req.body;
    //tengo que obtener el id de especialista de acuerdo al id_usuario
    const id_especialista = await pool.query('SELECT id_especialista FROM especialistas WHERE id_usuario = ?', [id_usuario]);
    //convierte el RowDataPacket en un valor y lo guarda en Data obtiendo su id_especialista
    let data = JSON.stringify(id_especialista[0].id_especialista);
    //Ya tengo el id_usuario e id_especialista del Especialista que esta REGISTRANDO
    //insert en usuarios 
    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    //insert en pacientes con id_especialista que lo este registrando
    let sqlPacientes = `INSERT INTO pacientes(id_usuario, id_especialista, nombre, sexo, email, nacimiento, telefono) values (LAST_INSERT_ID(), '${data}', '${nombre}', '${sexo}', '${email}',  '${nacimiento}', '${telefono}')`;
    await pool.query(sqlPacientes);

};

modulosEspecialistasCtrl.verPacientes = async (req, res) => {
    const { id } = req.params;

}

module.exports = modulosEspecialistasCtrl;