require('./config/database');
const express = require('express')
const port =(process.env.port||4000)

//express
const app = express();


//config
app.set('port',port);

//rutas
app.use('/api',require('./routes/rutas'));

//iniciar express
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('error al iniciar el servidor'+error)
    }
    else{
        console.log('Servidor iniciado en el puerto'+ ' '+port)
    }
})  