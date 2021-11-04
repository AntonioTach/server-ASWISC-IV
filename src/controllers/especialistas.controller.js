
const pool = require('../database');
//const bcryptjs = require('bcryptjs');       //Encriptar 

const especialistasCtrl = {};

//const bcryptjs = require('bcryptjs');       //Encriptar 
const jwt = require('jsonwebtoken');

const Especialista = require('../models/especialista');
const e = require('express');


//Creacion Especialista
especialistasCtrl.createEspecialista = async (req, res) => 
{
    console.log(req.body);
    //Tipo 1 = Especialista
    const{usuario, contrasena, id_tipo=1} = req.body;
    const{nombre, direccion, email, profesion, telefono, estudios, nacimiento} = req.body;
    //insert en usuarios 
    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    let sqlEspecialistas = `INSERT INTO especialistas(id_usuario, nombre, direccion, email, profesion, telefono, estudios, nacimiento) values (LAST_INSERT_ID(), '${nombre}', '${direccion}', '${email}', '${profesion}', '${telefono}', '${estudios}', '${nacimiento}')`;
    await pool.query(sqlEspecialistas);

    //await pool.query('INSERT INTO especialistas set ?', [req.body]);
    res.send({message: 'Especialista creado!'});
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
especialistasCtrl.signin = async (req,res) => {
    const { usuario, contrasena, id_tipo } = req.body;  
    //Obtener USUARIO Y ID_TIPO CUANDO EL NOMBRE DE USUARIO Y CONTRASENA COINCIDA
    await pool.query('SELECT usuario, id_tipo FROM usuarios where usuario=? and contrasena=?',
    [usuario, contrasena],
    (err, rows, fields) => {
        if(!err){
            if(rows.length > 0){ //Comprobacion para verificar que existan los datos en la bd
                let data = JSON.stringify(rows[0]); //Guardado de dato 
                const token = jwt.sign(data, 'warzone');    //creacion del token

                res.send({message: token});
            }else{
                //Si el usuario o contrasena no coincide, error y no se genera el token
                res.send({message: 'Usuario o contrasena incorrectos'});
            }
        }else {
            console.log(err);
        }
    }
    );
}


especialistasCtrl.verifyToken = (req, res, next) => {   //Verificar el funcionamiento del token y autorizacion
    if(!req.headers.authorization) return res.status(401).json('No Autorizado'); 

    const token = req.headers.authorization.substr(7);
    if(token!=''){
        const content = jwt.verify(token, 'warzone');
        req.data = content;
        //console.log(content);
        next();
    }
    else{
        res.status(401).json('Token Vacio');
    }

}




module.exports = especialistasCtrl;