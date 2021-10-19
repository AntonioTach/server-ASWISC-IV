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
    const Especialistas = await pool.query('SELECT * FROM especialistas');
    res.send({message: Especialistas});
}

//Obtener Un Especialista por id
especialistasCtrl.getEspecialista = async (req, res) => {
    const { id } = req.params;                      //Se obtiene una parte de un objeto, en este caso el ID
    const EspecialistaID = await pool.query('SELECT * FROM especialistas WHERE id_especialista = ?', [id]);    //Se devuelve el arreglo con los datos que coincida con el id requerido
    
    // console.log(EspecialistaID); //asi se obtiene el arreglo por lo que no es lo mejor

    if (EspecialistaID.length > 0){
        return res.json(EspecialistaID[0]); //Se obtiene el objeto
    }
    res.status(404).json({text: "El especialista no existe"}); //Si no existe el ID que se esta buscando tira error 404 y mensaje

}   

//Editar Especialista por id
especialistasCtrl.editEspecialista = async(req, res) => {
    const { id } = req.params;  
    
    await pool.query('UPDATE especialistas set ? WHERE id_especialista = ?', [req.body, id]);  
} 

//Eliminar Especialista por id
especialistasCtrl.deleteEspecialista = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM especialistas WHERE id_especialista = ?', [id]);
    res.send({message: 'Especialista Eliminado'});

}   

//Ingreso de sesion
especialistasCtrl.signin = (req,res) => {}



module.exports = especialistasCtrl;