const usuariosCtrl = {};

const pool = require('../database');
const jwt = require('jsonwebtoken');
const e = require('express');


//------------------------------Creacion Usuarios--------------------------------
//Creacion Especialista
usuariosCtrl.createEspecialista = async (req, res) => 
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
//Creacion Paciente
usuariosCtrl.createPaciente = async (req, res) => 
{    
    //Tipo 2 = Paciente
    const{usuario, contrasena, id_tipo=2} = req.body;
    const{nombre, email, nacimiento, telefono} = req.body;
    //insert en usuarios 
    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    let sqlPacientes = `INSERT INTO pacientes(id_usuario, nombre,  email, nacimiento, telefono) values (LAST_INSERT_ID(), '${nombre}', '${email}',  '${nacimiento}', '${telefono}')`;
    await pool.query(sqlPacientes);
}

//------------------------------Listar Usuarios por su tipo--------------------------------
//Listar Todos los Especialistas
usuariosCtrl.listarEspecialistas = async (req, res) => 
{
    const Especialistas = await pool.query('SELECT * FROM especialistas'); //Se obtienen todos los datos
    res.send({message: Especialistas});
}

//Listar Todos los Pacientes
usuariosCtrl.listarPacientes = async (req, res) => 
{
    const Pacientes = await pool.query('SELECT * FROM Pacientes'); //Se obtienen todos los datos
    res.send({message: Pacientes});
}

//------------------------------Listar Usuarios por su tipo--------------------------------
//Obtener el Especialista por su ID
usuariosCtrl.buscarEspecialista = async (req, res) => {
    const { id } = req.params;                      //Se obtiene una parte de un objeto, en este caso el ID
    const EspecialistaID = await pool.query('SELECT * FROM especialistas WHERE id_especialista = ?', [id]);    //Se devuelve el arreglo con los datos que coincida con el id requerido
    
    // console.log(EspecialistaID); //asi se obtiene el arreglo por lo que no es lo mejor

    if (EspecialistaID.length > 0){
        return res.json(EspecialistaID[0]); //Se obtiene el objeto
    }
    res.status(404).json({text: "El especialista no existe"}); //Si no existe el ID que se esta buscando tira error 404 y mensaje
}
//Obtener el Paciente por su ID
usuariosCtrl.buscarPaciente = async (req, res) => {
    const { id } = req.params;
    const PacienteID = await pool.query('SELECT * FROM pacientes WHERE id_paciente = ?', [id]);

    if(PacienteID.length > 0){
        return res.json(EspecialistaID[0]); //Se obtiene el objeto
    }
    res.status(404).json({text: "El paciente no existe"});
}

//-----------------------------Editar Usuarios por su tipo--------------------------------
//Editar Especialista
usuariosCtrl.editEspecialista = async(req, res) => {
    const { id } = req.params;  
    
    await pool.query('UPDATE especialistas set ? WHERE id_especialista = ?', [req.body, id]);  
} 
//Editar Pacientes
usuariosCtrl.editPaciente = async(req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE pacientes set ? WHERE id_paciente = ?', [req.body, id]);  
}

//-----------------------------Eliminar Usuarios por su tipo--------------------------------
//Eliminar Especialista
usuariosCtrl.deleteEspecialista = async (req, res) => {
    
    const { id } = req.params;
    //Identifica el id_usuario que se desea eliminar
    const idUsuario = await pool.query('SELECT id_usuario FROM especialistas WHERE id_especialista = ?', [id]);
    //convierte el RowDataPacket en un valor y lo guarda en Data
    var data = JSON.stringify(idUsuario[0].id_usuario);
    //Elimina primeramente la FK en la tabla especialistas con el id que se desea eliminar
    await pool.query('DELETE FROM especialistas WHERE id_especialista = ?', [id]);
    //Elimina despues la PK en la tabla usuarios con el id encontrado, guardado en data
    let sql = `DELETE FROM usuarios WHERE id_usuario = ${data}`;
    await pool.query(sql);

    res.send({message: 'Especialista Eliminado'});
    //Asi manda un RowDataPacket
    // const idUsuario = await pool.query('SELECT id_usuario FROM especialistas WHERE id_especialista = ?', [id]);
    // console.log(idUsuario);

    //Asi manda el objeto en JSON 
    // const idUsuario = await pool.query('SELECT id_usuario FROM especialistas WHERE id_especialista = ?', [id]);
    // if (idUsuario.length > 0){
    //     return res.json(idUsuario[0]); //Se obtiene el objeto si le quito el [0] se obtiene el arreglo
    // }

    //Asi masomenos deberia ser, pero no jala porque obtiene el dato como RowDataPacket
    // qResult = await pool.query('SELECT id_usuario FROM especialistas WHERE id_especialista = ?', [id]);
    // await pool.query(`DELETE FROM usuarios WHERE id_usuario = ${qResult}`), function (err){
    //     if(err){
    //         console.log(err);
    //     }
    // };
    // await pool.query('DELETE FROM especialistas WHERE id_especialista = ?', [id]);

    //Asi no jala tampoco
    // qResult = await pool.query('SELECT id_usuario FROM especialistas WHERE id_especialista = ?', [id]);
    // qResult = JSON.stringify(qResult, null, 1);
    // qResult = JSON.parse(JSON.stringify)
    // console.log(qResult);
    
    //Sentencia para eliminar el usuario en la tabla especialistas
    // await pool.query('DELETE FROM especialistas WHERE id_especialista = ?', [id]);

    //Mas de lo mismo
    // const { id_usuario } = req.params;
    // await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
    //Primero obtenemos el ID_usuario para eliminarlo en la tabla de usuarios
    //let id_usuario = await pool.query('SELECT id_usuario FROM especialistas WHERE id_especialista = ?', [id]);
    //Despues se elimina en la tabla usuarios con el id_usuario
    // await pool.query(`DELETE FROM usuarios WHERE id_usuario = ${id_usuario}`);

    //await pool.query('DELETE FROM especialistas WHERE id_especialista = ?', [id]);


    //let deleteUsuarios = `DELETE FROM usuarios WHERE id_usuarios = ${id_usuario}`;
    //await pool.query('SELECT * FROM especialistas WHERE id_especialista = ?', [id]);
    //await pool.query('DELETE FROM especialistas WHERE id_especialista = ?', [id]);


    
   
    //res.send({message: 'Especialista Eliminado'});
}   
usuariosCtrl.deletePaciente = async (req, res) => {
    const { id } = req.params;
    //Identifica el id_usuario que se desea eliminar
    const idUsuario = await pool.query('SELECT id_usuario FROM pacientes WHERE id_paciente = ?', [id]);
    //convierte el RowDataPacket en un valor y lo guarda en Data
    var data = JSON.stringify(idUsuario[0].id_usuario);
    //Elimina primeramente la FK en la tabla pacientes con el id que se desea eliminar
    await pool.query('DELETE FROM pacientes WHERE id_paciente = ?', [id]);
    //Elimina despues la PK en la tabla usuarios con el id encontrado, guardado en data
    let sql = `DELETE FROM usuarios WHERE id_usuario = ${data}`;
    await pool.query(sql);
    res.send({message: 'Paciente Eliminado'});
}


//-----------------------------Login y creacion TOKEN--------------------------------
//Login
usuariosCtrl.signin = async (req,res) => {
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
//Verify Token
usuariosCtrl.verifyToken = (req, res, next) => {   //Verificar el funcionamiento del token y autorizacion
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
module.exports = usuariosCtrl;