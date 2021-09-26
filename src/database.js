const mysql = require('mysql');

const { promisify } = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'aswisc_database',
    password: 'root'
});

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

//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;