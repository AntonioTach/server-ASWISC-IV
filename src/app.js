const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


const app = express();


//Enviroment Variables
app.set('port', process.env.port || 4000);
// app.use(cors({origin: "http://localhost:4200"})); //Recibir Peticiones exclusivamente de angular
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use("", require('./routes/usuarios.routes'));
app.use("", require('./routes/modulosEspecialistas.routes'));
app.use("/especialistas", require('./routes/especialistas.routes'));
app.use("/pacientes", require('./routes/pacientes.routes'));

app.use("/aswisc", require('./routes/aswisc.routes'));
app.use("/horarios", require('./routes/horarios.routes'));



module.exports = app;