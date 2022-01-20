const usuariosCtrl = {};

const pool = require('../database');
const jwt = require('jsonwebtoken');
const e = require('express');
const { response } = require('express');
const { query } = require('../database');


//------------------------------Creacion Usuarios--------------------------------
//Creacion Especialista
usuariosCtrl.createEspecialista = async (req, res) => 
{
    // console.log(req.body);
    //Tipo 1 = Especialista
    const{usuario, contrasena, id_tipo=1} = req.body;
    const{nombre, direccion, email, profesion, telefono, sexo, estudios, nacimiento} = req.body;
    //insert en usuarios 
    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    let sqlEspecialistas = `INSERT INTO especialistas(id_usuario, nombre, direccion, email, profesion, telefono, sexo, estudios, nacimiento) values (LAST_INSERT_ID(), '${nombre}', '${direccion}', '${email}', '${profesion}', '${telefono}', '${sexo}', '${estudios}', '${nacimiento}')`;
    await pool.query(sqlEspecialistas);

    //await pool.query('INSERT INTO especialistas set ?', [req.body]);
    res.send({message: 'Especialista creado!'});
}
//Creacion Paciente
usuariosCtrl.createPaciente = async (req, res) => 
{    
    ///console.log(req.body);
    //Tipo 2 = Paciente
    const{usuario, contrasena, id_tipo=2} = req.body;
    const{nombre, sexo, email, nacimiento, telefono} = req.body;
    //insert en usuarios 
    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    let sqlPacientes = `INSERT INTO pacientes(id_usuario, nombre, sexo, email, nacimiento, telefono) values (LAST_INSERT_ID(), '${nombre}', '${sexo}', '${email}',  '${nacimiento}', '${telefono}')`;
    await pool.query(sqlPacientes);
}

//------------------------------Listar Usuarios por su tipo--------------------------------
//Listar Todos los Especialistas
usuariosCtrl.listarEspecialistas = async (req, res) => 
{
    const Especialistas = await pool.query('SELECT * FROM especialistas'); //Se obtienen todos los datos
    res.JSON(Especialistas);
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
    
    const { id } = req.params; //Este es el id_usuario
    //Se actualiza el id_especialista a null de los pacientes inscritos con este especialista
    //Para esto se requiere conocer id_especialista
    const IdEspecialista = await pool.query('SELECT id_especialista FROM  especialistas WHERE id_usuario = ?', [id]);
    //convierte el RowDataPacket en un valor y lo guarda en Data
    var data = JSON.stringify(IdEspecialista[0].id_especialista); //data = id_especialista

    //Primero se necesita actualizar el id_especialista en pacientes inscritos en el a NULL
    let UpdateToNull = `UPDATE pacientes SET id_especialista = NULL WHERE id_especialista = ${data}`;
    await pool.query(UpdateToNull);

    //Se elimina el FK, en tabla especialistas se elimina el id_usuario
    await pool.query('DELETE FROM especialistas WHERE id_usuario = ?', [id]);
    //Se elimina despues la PK en la tabla usuarios con el id encontrado, guardado en data
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    res.send({message: 'Especialista Eliminado'});

}   
usuariosCtrl.deletePaciente = async (req, res) => {

    const { id } = req.params;  //id_usuario

    //Si esta registrado a un especialista, se cambia a null el id_especialista
    await pool.query('UPDATE pacientes SET id_especialista = NULL WHERE id_usuario = ?', [id]);
    //Elimina primeramente la FK en la tabla pacientes con el id_usuario
    await pool.query('DELETE FROM pacientes WHERE id_usuario = ?', [id]);
    //PK en usuarios
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    res.send({message: 'Paciente Eliminado'});
}


//-----------------------------Login y creacion TOKEN--------------------------------
//Login
usuariosCtrl.signin = async (req,res) => {
    const { usuario, contrasena} = req.body;  
    let tipo;
    console.log(req.body);
    //Obtener USUARIO Y ID_TIPO CUANDO EL NOMBRE DE USUARIO Y CONTRASENA COINCIDA
    await pool.query(`SELECT usuario, id_tipo, id_usuario FROM usuarios WHERE usuario=? and contrasena=?`,
    [usuario, contrasena],
    (err, rows, fields) => {

        if(err){
            res.send({message: 'Usuario o contrasena incorrectos'});
        }

        if(rows.length > 0){
            let data = JSON.stringify(rows[0]); //Guardado de dato 
            const token = jwt.sign(data, 'warzone');    //creacion del token
            let usuario = JSON.stringify(rows[0].usuario);  //obtener usuario
            let id_tipo = JSON.stringify(rows[0].id_tipo);  //obtener id tipo
            let id_usuario = JSON.stringify(rows[0].id_usuario);//obtener id usuario
            console.log(id_usuario);
            //res.send({message: token});post
            //console.log(token)
            // console.log('Sesion iniciada');
            return res.status(200).json({token, usuario, id_tipo, id_usuario});
        }
        else{
            res.send({message: 'Usuario o contrasena incorrectos'});
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

//-----------------------------Buscar Correo Repetido--------------------------------
//Buscar correo repetido en Registro Especialista
usuariosCtrl.buscarCorreoRepetido = async (req, res) => {
    const { email } = req.body;
    const correo = await pool.query(`SELECT nombre FROM pacientes WHERE email=?`,
    [email],
    (err, rows, fields) => {    
        if (err){console.log(err)}
        if (rows.length > 0){
            console.log('Existe un correo repetido');
            res.send(true);
        }else {
            console.log('No existe un correo repetido');
            res.send(false);
            }
        }
    );
}
//Buscar correo repetido en Registro Paciente
usuariosCtrl.buscarCorreoRepetidoEspecialista = async (req, res) => {
    const { email } = req.body;
    const correo = await pool.query(`SELECT nombre FROM especialistas WHERE email=?`,
    [email],
    (err, rows, fields) => {
        if (err) {console.log(err)}
        if (rows.length > 0){
            console.log('Existe un correo repetido');
            res.send(true);
        }
        else {
            console.log('No existe un correo repetido');
            res.send(false);
        }
    }
    );
}
//Actualizar datos de un paciente
usuariosCtrl.actualizarDatos= async (req,res) =>{

    const{usuario, contrasena, id_tipo=2} = req.body;
    const{nombre, sexo, email, nacimiento, telefono} = req.body;
    await pool.query(`SELECT nombre FROM pacientes WHERE usuario=?`,
    [usuario],
    (err, rows, fields) => {    
        if (err){console.log(err)}
        if (rows.length > 0){
            console.log('Existe un usuario con el mismo nombre');
            res.send(true);
        }else {
            console.log('No existe un usuario repetido');
            res.send(false);
            }
        }
    );



    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    let sqlPacientes = `INSERT INTO pacientes(id_usuario, nombre, sexo, email, nacimiento, telefono) values (LAST_INSERT_ID(), '${nombre}', '${sexo}', '${email}',  '${nacimiento}', '${telefono}')`;
    await pool.query(sqlPacientes);
}
module.exports = usuariosCtrl;