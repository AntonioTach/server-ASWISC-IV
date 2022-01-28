const aswiscCtrl = {};

const e = require('express');
//----------------------Solucion Automatizada WISC-IV "ASWISC-IV"----------------------------
aswiscCtrl.automatizarPrueba =  async (req, res) => {

    const { id, nombre, fecha, cubos, semejanzas, digitos, conceptos, claves, vocabulario, letras, matrices, comprension, 
    busqueda, figuras, animales, informacion, aritmetica, adivinanza } = req.body;
    let sql = ` SELECT FROM pacientes where id_paciente = ${id}`;
    await pool.query(sql); 
 
} 

module.exports = aswiscCtrl; 