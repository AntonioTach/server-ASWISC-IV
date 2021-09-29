const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();



app.set('port', process.env.port || 4000);
// app.use(cors({origin: "http://localhost:4200"})); //Recibir Peticiones exclusivamente de angular
app.use(cors());

app.use(morgan('dev'));

app.use("/api/especialistas", require('./routes/especialistas.routes'));




module.exports = app;