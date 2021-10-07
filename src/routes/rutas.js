const router = require('express').Router();
const { response } = require('express');
const conexion = require('../config/database')

//----------asignamos todas las rutas-----------
//get especialistas
router.get('/',(request,response)=>{
    let sql ='select * from especialistas';
    conexion.query(sql,(error,rows,fields)=>{
        if(error) throw error;
        else{
            response.json(rows)
        }
    })
})
//----------------------------------------------
module.exports = router;
//no me deja hacer query alv