const express = require('express');
const morgan = require('morgan');

const app = express();



app.set('port', process.env.port || 4000);

app.use(morgan('dev'));

app.use("/api/especialistas", require('./routes/especialistas.routes'));




module.exports = app;