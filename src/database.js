const mysql = require('mysql');

const { promisify } = require('util');

const {database} = require('../keys'); 

const pool = mysql.createPool(database);        //la configuracion se genera a la base de datos y la llamamos pool\
//usamos la conexion antes de exportarla para no llamadla a cada momento cuando ejecutemos el codigo asi solo llamamos al modulo con la conexion

pool.getConnection((err, connection) => {
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION DE LA BASE DE DATOS FUE CERRADA');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION DE LA BASE DE DATOS FUE RECHAZADA');
        }
    }
    if (connection) connection.release();
    console.log('Base de Datos Conectada');
    return;
});



//Convirtiendo a promesas lo que era callbacks 
//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;