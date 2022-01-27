const usuariosCtrl = {};

const pool = require('../database');
const jwt = require('jsonwebtoken');
const e = require('express');
const { response } = require('express');
const { query } = require('../database');
const { json } = require('express/lib/response');
const res = require('express/lib/response');




//------------------------------Creacion Usuarios--------------------------------
//Creacion Especialista
usuariosCtrl.createEspecialista = async (req, res) => {
    // console.log(req.body);
    //Tipo 1 = Especialista
    const { usuario, contrasena, id_tipo = 1 } = req.body;
    const { nombre, direccion, email, profesion, telefono, sexo, estudios, nacimiento, foto_profesional, cedula, curriculum, precio } = req.body;
    //insert en usuarios 
    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    let sqlEspecialistas = `INSERT INTO especialistas(id_usuario, nombre, direccion, email, profesion, telefono, sexo, estudios, nacimiento,foto_profesional,curriculum,cedula,precio_consulta_general) values (LAST_INSERT_ID(), '${nombre}', '${direccion}', '${email}', '${profesion}', '${telefono}', '${sexo}', '${estudios}', '${nacimiento}','${foto_profesional.toString()}','${curriculum.toString()}','${cedula.toString()}',${precio})`;
    await pool.query(sqlEspecialistas);

    //await pool.query('INSERT INTO especialistas set ?', [req.body]);
    res.send({ message: 'Especialista creado!' });
}
//Creacion Paciente
usuariosCtrl.createPaciente = async (req, res) => {
    ///console.log(req.body);
    //Tipo 2 = Paciente
    const { usuario, contrasena, id_tipo = 2 } = req.body;
    const { nombre, sexo, email, nacimiento, telefono } = req.body;
    //insert en usuarios 
    let sql = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sql);
    let sqlPacientes = `INSERT INTO pacientes(id_usuario, nombre, sexo, email, nacimiento, telefono) values (LAST_INSERT_ID(), '${nombre}', '${sexo}', '${email}',  '${nacimiento}', '${telefono}')`;
    await pool.query(sqlPacientes);
}
//Registrar a un Paciente por medio del Especialista
usuariosCtrl.registrarPaciente = async (req, res) => {
    // console.log(req.body);
    const { usuario, contrasena, id_tipo = 2 } = req.body; //Datos para tabla Usuarios
    const { id_usuario, nombre, sexo, email, nacimiento, telefono, precio_consulta } = req.body;
    //el id_usuario es del Especialista que esta registrando a dicho Paciente
    //Se debe obtener el id_esepcialista del especialista registrando
    //const id_especialista = await pool.query(`SELECT id_especialista FROM especialistas WHERE id_usuario = ${id_usuario}`);
    ///console.log(id_especialista); // Este es el id_especialista
    //let data = JSON.stringify(id_especialista); //Convertimos el RowData a data, que es el id_especialista
    //console.log(data);
    //console.log(id_especialista);
    //insert en Usuarios
    let sqlUsuarios = `INSERT INTO usuarios(usuario, contrasena, id_tipo) values ('${usuario}', '${contrasena}', '${id_tipo}')`;
    await pool.query(sqlUsuarios); //Sentencia en Usuarios

    //insert en Pacientes
    let sqlPacientes = `INSERT INTO pacientes(id_usuario,  nombre, sexo, email, nacimiento, telefono, id_especialista,precio_consulta) values (LAST_INSERT_ID(), '${nombre}', '${sexo}', '${email}',  '${nacimiento}', '${telefono}', '${id_usuario}', '${precio_consulta}')`;
    await pool.query(sqlPacientes);


}
//------------------------------Listar Usuarios por su tipo--------------------------------
//Listar Todos los Especialistas
usuariosCtrl.listarEspecialistas = async (req, res) => {
    const Especialistas = await pool.query('SELECT * FROM especialistas'); //Se obtienen todos los datos
    res.json(Especialistas);
}

//Listar Todos los Pacientes
usuariosCtrl.listarPacientes = async (req, res) => {
    const Pacientes = await pool.query('SELECT * FROM Pacientes'); //Se obtienen todos los datos
    res.send({ message: Pacientes });
}

//------------------------------Listar Usuarios por su tipo--------------------------------
//Obtener el Especialista por su ID
usuariosCtrl.buscarEspecialista = async (req, res) => {
    const { id } = req.params;                      //Se obtiene una parte de un objeto, en este caso el ID
    const EspecialistaID = await pool.query('SELECT * FROM especialistas WHERE id_usuario = ?', [id]);    //Se devuelve el arreglo con los datos que coincida con el id requerido

    console.log(EspecialistaID, id); //asi se obtiene el arreglo por lo que no es lo mejor

    if (EspecialistaID.length > 0) {
        return res.json(EspecialistaID[0]); //Se obtiene el objeto
    }
    res.status(404).json({ text: "El especialista no existe" }); //Si no existe el ID que se esta buscando tira error 404 y mensaje
}
//Obtener el Especialista por su ID
usuariosCtrl.buscarEspecialistaAll = async (req, res) => {
    const { id } = req.params;
    const EspecialistaID = await pool.query('SELECT * FROM especialistas p INNER JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE p.id_usuario = ?', [id]);
    if (EspecialistaID.length > 0) {
        return res.json(EspecialistaID);
    }
    res.status(404).json({ text: "El Especialista no existe" });
}
//Obtener el Paciente por su ID
usuariosCtrl.buscarPaciente = async (req, res) => {
    const { id } = req.params;
    const PacienteID = await pool.query('SELECT * FROM pacientes p INNER JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE p.id_usuario = ?', [id]);

    if (PacienteID.length > 0) {
        console.log(PacienteID)
        return res.json(PacienteID); //Se obtiene el objeto
    }
    res.status(404).json({ text: "El paciente no existe" });
}
//Obtener Paciente Nombre
usuariosCtrl.buscarPacienteNombre = async (req, res) => {
    const { id } = req.params;
    const paciente = await pool.query('SELECT pacientes.nombre, pacientes.sexo, pacientes.nacimiento, pacientes.email, pacientes.telefono, usuarios.usuario, usuarios.contrasena FROM pacientes INNER JOIN usuarios ON pacientes.id_usuario = usuarios.id_usuario WHERE usuarios.id_usuario = ?', [id]);
    console.log(paciente);
    return res.json(paciente);
    // return res.json({ paciente, usuario});
}
//-----------------------------Editar Usuarios por su tipo--------------------------------
//Editar Especialista
usuariosCtrl.editEspecialista = async (req, res) => {
    const { id } = req.params;

    await pool.query('UPDATE especialistas set ? WHERE id_especialista = ?', [req.body, id]);
}
//Editar Pacientes
usuariosCtrl.editPaciente = async (req, res) => {
    const { id } = req.params;
    const { observaciones, origen, ocupacion, estudios } = req.body;
    await pool.query(`UPDATE pacientes set observaciones='${observaciones}',origen='${origen}',ocupacion='${ocupacion}',estudios='${estudios}' WHERE id_usuario = ${id}`);
    res.json(req.body)
}
//Editar Paciente en Nombre Paciente
usuariosCtrl.editPacienteNombre = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { nombre, email, telefono, usuario, contrasena } = req.body;
    //Update tabla paciente
    await pool.query(`UPDATE pacientes set nombre='${nombre}', email='${email}', telefono='${telefono}' WHERE id_usuario = ${id}`);
    //Update tabla usuarios
    await pool.query(`UPDATE usuarios set usuario='${usuario}', contrasena = '${contrasena}' WHERE id_usuario = ${id}`);
    res.json(req.body);
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
    res.send({ message: 'Especialista Eliminado' });

}
usuariosCtrl.deletePaciente = async (req, res) => {
    const { id } = req.params;  //id_usuario
    //Si esta registrado a un especialista, se cambia a null el id_especialista
    await pool.query('UPDATE pacientes SET id_especialista = NULL WHERE id_usuario = ?', [id]);
    //Elimina primeramente la FK en la tabla pacientes con el id_usuario
    await pool.query('DELETE FROM pacientes WHERE id_usuario = ?', [id]);
    //PK en usuarios
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    res.send({ message: 'Paciente Eliminado' });
}
//eliminar subscreipciuon con el especialista
usuariosCtrl.deletePacienteFromEspecialista = async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE pacientes SET id_especialista= NULL WHERE id_paciente=?', [id]);
    res.json({ message: 'Paciente Eliminado' })
}
//inscripcion del paciente con el especialista
usuariosCtrl.agregarPacienteEspecialista = async (req, res) => {
    const { id } = req.params;
    const { id_especialista, precio_consulta_general } = req.body;
    await pool.query(`UPDATE pacientes SET id_especialista= ${id_especialista},precio_consulta=${precio_consulta_general} WHERE id_usuario=${id}`);
    res.send({ message: 'correcto' });
}
//mandara error pero si funciona
usuariosCtrl.inscripcionCancelada = async (req, ers) => {
    try {
        const { id } = req.params;
        await pool.query(`UPDATE pacientes SET id_especialista=NULL,precio_consulta=NULL WHERE id_usuario=${id}`);
        res.send({ message: 'correcto' })
    } catch (error) {
        console.log(error);
    }

}
//guarda articulo
usuariosCtrl.guardarArticulo = async (req, res) => {
    const { id_especialista, titulo, descripcion } = req.body;
    const estado_articulo = 1;
    await pool.query(`INSERT INTO articulos(id_especialista,titulo,descripcion,estado_articulo) values(${id_especialista},'${titulo}','${descripcion}',${estado_articulo})`)
    res.send({ message: 'correcto' })
}
//publicar articulo
usuariosCtrl.publicarArticulo = async (req, res) => {
    try {
        const { id_especialista, titulo, descripcion } = req.body;
        const estado_articulo = 2;
        await pool.query(`INSERT INTO articulos(id_especialista,titulo,descripcion,estado_articulo) values(${id_especialista},'${titulo}','${descripcion}',${estado_articulo})`)
        res.send({ message: 'correcto' })
    } catch (error) {
        console.log(error);
    }

}

//subir prueba
usuariosCtrl.subirPrueba = async (req, res) => {
    const { nombre_prueba, id_paciente, comentarios, documento } = req.body;
    await pool.query(`INSERT INTO pruebas(nombre_prueba,id_paciente,comentarios,documento) values('${nombre_prueba}',${id_paciente},'${comentarios}','${documento}')`)
    res.send({ message: 'correcto' })
}
//ver pruebas pacientes
usuariosCtrl.verPruebaPaciente = async (req, res) => {
    const { id } = req.params;
    const pruebas = await pool.query(`SELECT * FROM pruebas p INNER JOIN pacientes u ON p.id_paciente=u.id_paciente WHERE u.id_usuario=${id} `)
    //console.log(pruebas);
    return res.json(pruebas);
}
//Subir Tarea
usuariosCtrl.subirTarea = async (req, res) => {
    const { titulo, id_paciente, descripcion, documento } = req.body;
    await pool.query(`INSERT into tareas(id_paciente, titulo, descripcion, documento) values(${id_paciente}, '${titulo}', '${descripcion}', '${documento}' )`);
    res.send({ message: 'Tarea asignada Correctamente' });
}
//tomar una prueba
usuariosCtrl.getPrueba = async (req, res) => {
    const { id } = req.params;
    const prueba = await pool.query(`SELECT * FROM pruebas WHERE id_pruebas=${id}`);
    res.json(prueba);
}
//ver todas las tareas del los pacientes
usuariosCtrl.getTareasEspecialista = async (req, res) => {
    const { id } = req.params;
    const tareas = await pool.query(`SELECT * FROM tareas t INNER JOIN pacientes p ON t.id_paciente=p.id_paciente WHERE p.id_especialista=${id}`);
    res.json(tareas);
}
usuariosCtrl.verTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await pool.query(`SELECT * FROM tareas WHERE id_tarea=${id}`);
    res.json(tarea);
}
//tomar todos los articulos
usuariosCtrl.articulosLista = async (req, res) => {
    const articulos = await pool.query(`SELECT * FROM articulos a INNER JOIN especialistas e ON a.id_especialista=e.id_especialista WHERE estado_articulo=2`)
    res.json(articulos)
}
//solo articulos personales
usuariosCtrl.articulosPersonales = async (req, res) => {
    const { id } = req.params;
    const articulos = await pool.query(`SELECT * FROM articulos a INNER JOIN especialistas e ON a.id_especialista=e.id_especialista WHERE e.id_especialista=${id}`)
    res.json(articulos)
}
//tomar un solo articulo
usuariosCtrl.tomarArticulo = async (req, res) => {
    const { id } = req.params;
    const articulo = await pool.query(`SELECT * FROM articulos WHERE id_articulo=${id}`);
    res.json(articulo);
}
//actuarlicar articulo al guardar
usuariosCtrl.modificarguardarArticulo = async (req, res) => {
    const { id } = req.params;
    const { id_especialista, titulo, descripcion } = req.body;
    await pool.query(`UPDATE articulos SET id_especialista=${id_especialista},titulo='${titulo}',descripcion='${descripcion}' WHERE id_articulo=${id}`)
    res.send({ message: 'correcto' })
}
//publicar articulo
usuariosCtrl.modificarpublicarArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_especialista, titulo, descripcion } = req.body;
        const estado_articulo = 2;
        await pool.query(`UPDATE articulos SET id_especialista=${id_especialista},titulo='${titulo}',descripcion='${descripcion}',estado_articulo=${estado_articulo} WHERE id_articulo=${id}`)
        res.send({ message: 'correcto' })
    } catch (error) {
        console.log(error);
    }

}
usuariosCtrl.getTareasPaciente = async (req, res) => {
    const { id } = req.params;
    const tareas = await pool.query(`SELECT * FROM tareas t INNER JOIN pacientes p ON p.id_paciente=t.id_paciente WHERE p.id_usuario=${id}`);
    res.json(tareas);
}
usuariosCtrl.modificarPrecio = async (req, res) => {
    const { id } = req.params;
    const { precio_consulta_general } = req.body;
    console.log(precio_consulta_general);
    await pool.query(`UPDATE especialistas SET precio_consulta_general=${precio_consulta_general} WHERE id_especialista=${id}`);
    res.send({ message: 'correcto 1' })
}
usuariosCtrl.modifcarPrecioPaciente = async (req, res) => {
    const { id } = req.params;
    const { precio_consulta } = req.body;
    console.log(precio_consulta, id);
    await pool.query(`UPDATE pacientes SET precio_consulta=${precio_consulta} WHERE id_usuario=${id} AND estatus=1`)
    res.send({ message: 'correcto 2' })
}
usuariosCtrl.verCarrito = async (req, res) => {
    const { id } = req.params;
    const carrito = await pool.query(`SELECT * FROM pagos p INNER JOIN pacientes u ON p.id_paciente=u.id_paciente WHERE id_usuario=${id} AND  estatus=1`)
    return res.json(carrito);
}
usuariosCtrl.pagarCarrito = async (req, res) => {
    const { id } = req.params;
    const { estatus } = req.body;
    await pool.query(`UPDATE pagos SET estatus=${estatus} WHERE id_paciente=${id}`);
    res.send({ message: 'correcto' })
}

usuariosCtrl.verCarrito2 = async (req, res) => {
    const { id } = req.params;
    const carrito = await pool.query(`SELECT * FROM pagos WHERE id_especialista = '${id}' AND estatus = 2`)
    // const carrito = await pool.query(`SELECT * FROM pagos WHERE id_especialista=${id} AND  estatus=2`)
    return res.json(carrito);
}
//usuariosCtrl.articulos() = as
// usuariosCtrl.ver
//-----------------------------Login y creacion TOKEN--------------------------------
//Login
usuariosCtrl.signin = async (req, res) => {
    const { usuario, contrasena } = req.body;
    let tipo;
    console.log(req.body);
    //Obtener USUARIO Y ID_TIPO CUANDO EL NOMBRE DE USUARIO Y CONTRASENA COINCIDA
    await pool.query(`SELECT usuario, id_tipo, id_usuario FROM usuarios WHERE usuario=? and contrasena=?`,
        [usuario, contrasena],
        (err, rows, fields) => {

            if (err) {
                console.log(err);
            }
            if (rows.length > 0) {
                let data = JSON.stringify(rows[0]); //Guardado de dato 
                const token = jwt.sign(data, 'warzone');    //creacion del token
                let usuario = JSON.stringify(rows[0].usuario);  //obtener usuario
                let id_tipo = JSON.stringify(rows[0].id_tipo);  //obtener id tipo
                let id_usuario = JSON.stringify(rows[0].id_usuario);//obtener id usuario
                console.log(id_usuario);
                //res.send({message: token});post
                //console.log(token)
                // console.log('Sesion iniciada');
                return res.status(200).json({ token, usuario, id_tipo, id_usuario });
            }
            else {
                res.send(false);
                
            }
        }
    );

}




//Verify Token
usuariosCtrl.verifyToken = (req, res, next) => {   //Verificar el funcionamiento del token y autorizacion
    if (!req.headers.authorization) return res.status(401).json('No Autorizado');

    const token = req.headers.authorization.substr(7);
    if (token != '') {
        const content = jwt.verify(token, 'warzone');
        req.data = content;
        //console.log(content);
        next();
    }
    else {
        res.status(404).json('Token Vacio');
    }

}

//-----------------------------Buscar Correo Repetido--------------------------------
//Buscar correo repetido en Registro Especialista
usuariosCtrl.buscarCorreoRepetido = async (req, res) => {
    
    const { email } = req.body;
    const correo = await pool.query(`SELECT nombre FROM pacientes WHERE email=?`,
        [email],
        (err, rows, fields) => {
            if (err) { console.log(err) }
            if (rows.length > 0) {
                console.log('Existe un correo repetido');
                res.send(true);
            } else {
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
            if (err) { console.log(err) }
            if (rows.length > 0) {
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
//Identificar Email
usuariosCtrl.identificarEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    await pool.query(`SELECT email FROM especialistas WHERE email=?`, [email],
    (err, rows) => {
        if(err) {console.log(err)}
        if(rows.length > 0){
            //Existe en Especialistas
            // console.log('Existe en Especialistas');
            res.send(true);
        }
        else{
            // console.log('No Existe en Especialistas');
            res.send(false)
            
        }
    });

}
//Identificar si existe email paciente
usuariosCtrl.identificarEmailPaciente = async (req, res) => {
    const { email } = req.body;
    // console.log(email);
    await pool.query(`SELECT email FROM pacientes WHERE email=?`, [email],
    (err, rows) => {
        if(err) {console.log(err)}
        if(rows.length > 0){
            //Existe en Pacientes
            // console.log('Existe en Pacientes');
            res.send(true);
        }
        else{
            // console.log('No Existe en Pacientes');
            res.send(false);
        }
    });
}
//Mandar email 
usuariosCtrl.mandarEmail = async (req, res) => {
    const {email, token} = req.body;
    const sgMail = require("@sendgrid/mail");
    require("dotenv").config();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
    const msg = {
        to: email, 
        from: 'aswisc@gmail.com', 
        subject: 'TOKEN ASWSIC-IV',
        text: token,
    }

    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            console.log('Email enviado');
          })
          .catch((error) => {
            console.error(error)
          })

}
//Update Contrasena Especialista
usuariosCtrl.updateContrasenaEspecialista = async (req, res) => {
    const { contrasena, email } = req.body;
    const id_usuario = await pool.query(`SELECT id_usuario FROM especialistas WHERE email = ?`, [email]);
    let data = JSON.stringify(id_usuario[0].id_usuario); //id_ usuario
    await pool.query(`UPDATE usuarios SET contrasena = '${contrasena}' WHERE id_usuario= ${data}`);
    res.send(true);
}
//Update Contrasena Pacieente
usuariosCtrl.updateContrasenaPaciente = async (req, res) => {
    const { contrasena, email } = req.body;
    const id_usuario = await pool.query(`SELECT id_usuario FROM pacientes WHERE email = ?`, [email]);
    let data = JSON.stringify(id_usuario[0].id_usuario); //id_ usuario
    await pool.query(`UPDATE usuarios SET contrasena = '${contrasena}' WHERE id_usuario= ${data}`);
    res.send(true);
}

//Actualizar datos de un paciente
usuariosCtrl.actualizarDatos = async (req, res) => {

    const { usuario, contrasena, id_tipo = 2 } = req.body;
    const { nombre, sexo, email, nacimiento, telefono } = req.body;
    await pool.query(`SELECT nombre FROM pacientes WHERE usuario=?`,
        [usuario],
        (err, rows, fields) => {
            if (err) { console.log(err) }
            if (rows.length > 0) {
                console.log('Existe un usuario con el mismo nombre');
                res.send(true);
            } else {
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