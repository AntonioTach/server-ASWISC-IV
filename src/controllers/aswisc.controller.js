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
        "72,75": {
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
        },
        "76,78": {
            'Cubos': {
                'rangos': [
                    range(0,68)
                ],
                'valores': [
                    []
                ],
            }
        },
        "79,81":{
            'Cubos':{
                'rangos':[
                    range(0,32)
                ],
                'valores':[
                    []
                ],
            }
        },
        "82,84":{

        },
        "85,87":{

        },
        "88,90":{

        },
        "91:93":{

        },
        "94:96":{

        }, 
        "97,99":{

        },
        "100,102":{

        },
        "103,105":{

        },
        "106,108":{

        },
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
