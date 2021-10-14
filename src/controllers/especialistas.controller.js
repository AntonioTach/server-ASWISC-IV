//const express = require('express');


const pool = require('../database');

const especialistasCtrl = {};



const Especialista = require('../models/especialista');

especialistasCtrl.getEspecialistas = (req, res) => {
    res.send('GET especialistas');
    console.log(req.body);
}       


//Creacion Especialista
especialistasCtrl.createEspecialista = (req, res) =>
{
    console.log(req.body);
    res.send({message: 'Especialista creado!'});
    //pool.query('DESCRIBE especialistas');
    // res.json('Especialista table');
    
    //res.status(200).json({'estado': 'ok'})
}



especialistasCtrl.getEspecialista = (req, res) => {}     
especialistasCtrl.editEspecialista = (req, res) => {} 
especialistasCtrl.deleteEspecialista = (req, res) => {}      
especialistasCtrl.signin = (req,res) => {}



module.exports = especialistasCtrl;