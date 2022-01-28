const aswiscCtrl = {};

const e = require("express");
const pool = require("../database");
const res = require("express/lib/response");
//----------------------Solucion Automatizada WISC-IV "ASWISC-IV"----------------------------
aswiscCtrl.automatizarPrueba = async (req, res) => {
    debugger;
    const {
        Aritmetica = 0,
        BusquedaSimbolos = 0,
        Claves = 0,
        Comprension = 0,
        Conceptos = 0,
        Cubos = 0,
        Digitos = 0,
        Fecha,
        FigurasIncompletas = 0,
        Informacion = 0,
        LetrasNumeros = 0,
        Matrices = 0,
        Pistas = 0,
        Registros = 0,
        Semejanzas = 0,
        Vocabulario = 0,
        id_usuario,
    } = req.body;
    let range = (start, end) => {
        return Array(end - start + 1)
            .fill()
            .map((_, idx) => start + idx);
    };
    let response = {};
    let fechaEscogida = new Date(Fecha);
    let sql = ` SELECT nacimiento FROM pacientes where id_usuario = ${id_usuario}`;
    let paciente = (await pool.query(sql))[0];
    let fechaNacimiento = new Date(paciente.nacimiento);
    let diff =
        fechaEscogida.getMonth() -
        fechaNacimiento.getMonth() +
        12 * (fechaEscogida.getFullYear() - fechaNacimiento.getFullYear());
    // if (diff < 72 || diff > 204)
    //     return res.json({
    //         success: false,
    //         message:
    //             "La prueba no se puede automatizar. Por favor ingresa una fecha válida.",
    //         data: response,
    //     });
    debugger
    let data = {
        "72,75": { //Edades 6:0-6:3
            'Cubos': {
                'rangos': [
                    range(0, 68), // [0,1,2,3,4,5,...,68]
                ],
                'valores': [
                    [
                        1, 2, 3, 4, 5, 6, 7, 7, 8, 8, 8, 9, 9, 10, 10, 11,
                        11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 15,
                        15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 17, 17, 17,
                        17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19,
                        19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
                    ],
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [
                        2, 3, 4, 5,6,7,7,8,8,8,9,9,10,10,11,11, 
                    
                    ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0, 32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
        },
        "76,79": { // 6:4-6:7
            'Cubos': {
                'rangos': [
                    range(0,68)
                ],
                'valores': [
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
        },
        "80,83":{ // 6:8-6:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
        },
        "84,87":{ //7:0-7:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "88,91":{ // 7:4-7:7
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "92,95":{ //7:8-7:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "96:99":{ //8:0-8:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "100:103":{ //8:4-8:7
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        }, 
        "104,107":{ //8:8-8:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "108,111":{ //9:0-9:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "112,115":{ //9:4-9:7
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "116,119":{ //9:8-9:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "120,123":{ //10:0-10:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "124,127":{ //10:4-10:7
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "128,131":{ //10:8-10:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "132,135":{ //11:0-11:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "136,139":{ //11:4-11:7
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "140,143":{ //11:8-11:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "144,147":{ //12:0-12:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "148,151":{ //12:4-12:7
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "152,155":{ //12:8-12:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "156,159":{ //13:0-13:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "160,163":{ //13:4-13:7
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "164,167":{ //13:8-13:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "168,171":{ //14:0-14:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "172,175":{ //14:4-14:7
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "176,179":{ //14:8-14:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "180,183":{ //15:0-15:3
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "184,187":{ //15:4-15:7 
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "188,191":{ //15:8-15:11
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "192,195":{
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "196,199":{
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },

        },
        "200,204":{ 
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            },
            'Semejanzas': {
                'rangos': [
                    range(0,44),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Digitos': {
                'rangos': [
                    range(0,32),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Conceptos': {
                'rangos': [
                    range(0,28),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Claves': {
                'rangos': [
                    range(0,119),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Vocabulario': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
            'LetrasNumeros': {
                'rangos': [
                    range(0,30),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Matrices': {
                'rangos': [
                    range(0,35),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Comprension': {
                'rangos': [
                    range(0,42),
                ],
                'valores': [
                    [ ],
                ],
            },
            'BusquedaSimbolos': {
                'rangos': [
                    range(0,60),
                ],
                'valores': [
                    [ ],
                ],
            },
            'FigurasIncompletas': {
                'rangos': [
                    range(0,38),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Registros': {
                'rangos': [
                    range(0,136),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Informacion': {
                'rangos': [
                    range(0,33),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Aritmetica': {
                'rangos': [
                    range(0,34),
                ],
                'valores': [
                    [ ],
                ],
            },
            'Pistas': {
                'rangos': [
                    range(0,68),
                ],
                'valores': [
                    [ ],
                ],
            },
        }
    };

    for (let rangoMeses of Object.keys(data)) {
        let meses = rangoMeses.split(',')
        meses = meses.map(m => parseInt(m))
        for (let prueba of Object.keys(data[rangoMeses])) {
            let propiedades = data[rangoMeses][prueba] // {rangos, valores}
            if (range(meses[0], meses[meses.length - 1]).includes(diff)) {
                let indice = propiedades.rangos[0].findIndex(i => i == req.body[prueba])
                if (indice > -1)
                    response[prueba] = propiedades.valores[0][indice]
            }
        }
    }
    debugger
    // { 'Cubos': 12, 'Semejanzas': 2 }
    let comprensionVerbal = Object.keys(response).reduce((acc, prueba) => {
        let indices = ['Semejanzas', 'Vocabulario', 'Comprension', 'Informacion', 'Pistas']
        if (indices.includes(prueba))
            return acc + response[prueba]
        else 
            return acc
    }, 0)

    let escalaTotal = Object.keys(response).reduce((acc, prueba) => {
        let indices = [
            'Cubos',
            'Semejanzas',
            'Vocabulario',
            'Comprension',
            'Informacion',
            'Pistas',
            'Digitos',
            'Conceptos',
            'Claves',
            'LetrasNumeros',
            'Matrices',
            'Comprension',
            'BusquedaSimbolos'
        ]
        if (indices.includes(prueba))
            return acc + response[prueba]
        else 
            return acc
    }, 0)

    let razonamientoPerceptual = Object.keys(response).reduce((acc, prueba) => {
        let indices = [
            'Cubos',
            'Conceptos',
            'Matrices',
            'FigurasIncompletas'
       ]
        if (indices.includes(prueba))
            return acc + response[prueba]
        else 
            return acc
    }, 0)

    let velociedadDeProcesamiento = Object.keys(response).reduce((acc, prueba) => {
        let indices = [
            'Claves',
            'BusquedaSimbolos',
            'Registros',
        ]
        if (indices.includes(prueba))
            return acc + response[prueba]
        else 
            return acc
    }, 0)

    let memoriaDeTrabajo = Object.keys(response).reduce((acc, prueba) => {
        let indices = [
            'Aritmetica',
            'LetrasNumeros',
            'Digitos'
        ]
        if (indices.includes(prueba))
            return acc + response[prueba]
        else 
            return acc
    }, 0)

    response['nacimiento'] = fechaNacimiento
    response['fechaEvaluacion'] = fechaEscogida
    response['comprensionVerbal'] = comprensionVerbal
    response['puntuacionMediaCompresionVerbal'] = (comprensionVerbal / 3).toFixed(0)
    response['escalaTotal'] = escalaTotal
    response['puntuacionMediaSubprueba'] = (escalaTotal / 10).toFixed(0)
    response['razonamientoPerceptual'] = razonamientoPerceptual
    response['puntuacionMediaComprensionVerbal'] = (razonamientoPerceptual / 3).toFixed(0)
    response['velociedadDeProcesamiento'] = velociedadDeProcesamiento
    response['memoriaDeTrabajo'] = memoriaDeTrabajo

    let rangos = range(45,155)

    let secondData = {
        'comprensionVerbal': [
        //  VALOR, ICV, RANGO, NIVEL CONF 95%
            [3 ,45, 0.1, "42-55"],
            [4, 47, 0.1, "43-57"],
            [5, 50, 0.1, "46-60"],
            [6, 53, 0.1, "49-63"],
            [7, 55, 0.1, "61-64"],

            [8, 55, 0.1, "61-64"],
            [9, 55, 0.1, "61-64"],
            [10, 55, 0.1, "61-64"],
            [11, 55, 0.1, "61-64"],
            [12, 55, 0.1, "61-64"],
        ],
        'razonamientoPerceptual': [
            [],
            [],
            [],
            [],
        ]
    }

    for (let llaveEscalar of Object.keys(secondData)) {
        let prueba = secondData[llaveEscalar]
        let elemento = prueba.find(elemento => elemento[0] == response[llaveEscalar])
        if (prueba) {
            response['equivalentesIndice' + llaveEscalar] = elemento
        }
    }

    res.json({ success: true, message: "Exito", data: response });
};

module.exports = aswiscCtrl;
