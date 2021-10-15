//const express = require('express');


const pool = require('../database');

const especialistasCtrl = {};



const Especialista = require('../models/especialista');


//Creacion Especialista
especialistasCtrl.createEspecialista = async (req, res) => 
{
    console.log(req.body);
    await pool.query('INSERT INTO especialistas set ?', [req.body]);
    res.send({message: 'Especialista creado!'});
    //pool.query('DESCRIBE especialistas');
    // res.json('Especialista table');
    
    //res.status(200).json({'estado': 'ok'})
}

//Listar todos los Especialistas
especialistasCtrl.listarEspecialistas = async (req, res) => 
{
    await pool.query('SELECT * FROM especialistas');
}

//Obtener Especialista por id
especialistasCtrl.getEspecialista = (req, res) => {

}   

//Editar Especialista por id
especialistasCtrl.editEspecialista = (req, res) => {
    res.send({message: 'Actualizando Especialista ' + req.params.id})
} 

//Eliminar Especialista por id
especialistasCtrl.deleteEspecialista = (req, res) => {
    res.send({message: 'Eliminando Especialista ' + req.params.id})

}   

//Ingreso de sesion
especialistasCtrl.signin = (req,res) => {}



module.exports = especialistasCtrl;