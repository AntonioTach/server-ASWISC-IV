const pool = require('../database');

const horariosCtrl = {};

const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2('57432841693-mijbi1j1o5fmo3vm7t2jpuudjrdqkcov.apps.googleusercontent.com', 
'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'
)

const stripe = require('stripe')('sk_test_51KvYRzEeE5SQU3ghucCf3UMdwqVBHwTuBBOtyE2zHpzdZCaerMYPPrybVhBNURmIRKym3n2ybjt9A78Khh0lQIqd00bFNsXPwy');

oAuth2Client.setCredentials({
    refresh_token: 
    '1//048X9xo1QXQivCgYIARAAGAQSNgF-L9IrE8aLmPgFowWAl8gtx5cAh0xxFwKCijLSASF01ZvDqos78FgevwKpZdlq5q3N94-a7A',
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

horariosCtrl.generarVideollamada = async (req, res) => {    

    const eventStartTime = new Date();
    eventStartTime.setDate(eventStartTime.getDay() + 2); //Tomorrow 

    const eventEndTime = new Date();
    eventEndTime.setDate(eventEndTime.getDay() + 2); 
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 60) //una hora

    console.log('Start date: ', eventStartTime);
    console.log('End date: ', eventEndTime);

    //Configuration 
    const event = {
        summary : 'Segunda prueba Tach', 
        description: 'Test with Google Meet Izcali and Tach love for all people',
        start : {
            dateTime : eventStartTime,
            timeZone: 'America/Mexico_City',
        },
        end : {
            dateTime: eventEndTime,
            timeZone: 'America/Mexico_City',
        },
        colorId: 1,
        attendees: [
            {'email': 'antach.vihe@gmail.com'}, //Email Especialista
            {'email': 'saulizcali@gmail.com'}  //Email Paciente
        ],
        conferenceData: { 
          createRequest: { 
            conferenceSolutionKey: { 
              type: 'hangoutsMeet' }, 
              requestId: 'coding-calendar-demo' } 
          },
        
        reminders: {
          useDefault: false,
            overrides: [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
    };
    

    calendar.freebusy.query({
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'America/Mexico_City',
            items: [{ id: 'primary' }],
        }
    }, (err, res) => {
        if (err) return console.error('Freebusy query error: ', err);

        const eventArr = res.data.calendars.primary.busy;

        console.log(eventArr);

        if(eventArr.length === 0) return calendar.events.insert(
            {calendarId: 'primary', resource: event, conferenceDataVersion: 1}, 
            (err) => {
                if(err) return console.error('Calendar Event Creation Error: ', err)
                
                return console.log('Calendar event created')
            }
        )
        return console.log('Calendar Busy');
    })
}

horariosCtrl.generarVideollamada2 = async(req, res) => {
    var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2022-04-24T09:00:00-07:00',
          'timeZone': 'America/Mexico_City'
        },
        'end': {
          'dateTime': '2022-04-24T17:00:00-07:00',
          'timeZone': 'America/Mexico_City'
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
          {'email': 'antach.vihe@gmail.com'},
          {'email': 'giovannienriquezp13@gmail.com'}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };
      
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
        
      });
      
      request.execute(function(event) {
        appendPre('Event created: ' + event.htmlLink);
      });
        
    }
    


horariosCtrl.addSession = async(req, res) => {
  try {
    // console.log(req.params.id)
    // console.log(req.body)
    let { eventName, startTime, endTime, idPaciente, precio, descripcion} = req.body;
    let idEspecilista = req.params.id
    // console.log("id Paciente: ", idPaciente);
    // console.log("id Especialista: ", idEspecilista);
    if(descripcion == undefined) descripcion = ".";

    let correoQueryEspecialista = await pool.query(`SELECT email from especialistas where id_especialista = '${idEspecilista}'`);
    let correoJSON = JSON.parse(JSON.stringify(correoQueryEspecialista));
    let correoEspecialista = correoJSON[0].email;

    let correoQueryPaciente = await pool.query(`SELECT email, precio_consulta from pacientes where id_paciente = '${idPaciente}'`);
    let correoPacienteJSON = JSON.parse(JSON.stringify(correoQueryPaciente));
    let correoPaciente = correoPacienteJSON[0].email;
    let precio_consulta = correoPacienteJSON[0].precio_consulta;

    console.log('Correo Especialista: ', correoEspecialista);
    console.log('Correo Paciente: ', correoPaciente);


    //Insert el objeto del bloque 
    let sql = `INSERT INTO horarios(id_paciente, id_especialista, id_sesion, startTime, endTime, titulo, descripcion, precio) VALUES ('${idPaciente}', '${idEspecilista}', '${null}', '${startTime}', '${endTime}', '${eventName}', '${descripcion}', '${precio_consulta}');`;
    // let sql = "SELECT * FROM horarios";
    await pool.query(sql);


    if(res.status(200)){
      //Si se inserta correctamente genera la videollamada
      //GENERATE MEET 
    
      const startTime2 = new Date(startTime);
      const endTime2 = new Date(endTime);
      //Conversion a Horario MX StartTime
      let numberOfMlSeconds = startTime2.getTime();
      let MlSeconds = (5 * 60) * 60000;
      let timeStartMX = new Date(numberOfMlSeconds - MlSeconds);
      console.log('Star time Mex ',timeStartMX);

      //Conversion a Horario MX StartTime
      let numberOfMlSeconds2 = endTime2.getTime();
      let MlSeconds2 = (5 * 60) * 60000;
      let timeEndMX = new Date(numberOfMlSeconds2 - MlSeconds2);
      console.log('End Time MEX ',timeEndMX);


      const event = {
        summary : eventName, 
        description: descripcion,
        start : {
            dateTime : startTime2,
            timeZone: 'America/Mexico_City',
        },
        end : {
            dateTime: endTime2,
            timeZone: 'America/Mexico_City',
        },
        colorId: 1,
        attendees: [
            {'email': correoEspecialista},
            {'email': correoPaciente}
        ],
        conferenceData: { 
          createRequest: { 
            conferenceSolutionKey: { 
              type: 'hangoutsMeet' }, 
              requestId: 'coding-calendar-demo' } 
          },
        
        reminders: {
          useDefault: false,
            overrides: [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
      };

      try{
        const response = await calendar.events.insert({ 
          calendarId: 'primary', 
          resource: event, 
          conferenceDataVersion: 1 }); 
  
          const { config: { data: { summary, location, start, end, attendees } }, data: { conferenceData } } = response;
  
          // Get the Google Meet conference URL in order to join the call
          const { uri } = conferenceData.entryPoints[0];
          console.log(`link: ${uri}`);
      }catch(err){
        console.log(err);
      }

      
    }

    return res.status(200).send({ message: "it works"})

  } catch (error) {
    console.error("Error happened\n", error)
    return res.status(500).send({error: "couldnt add sesion to the calendar"})
  }
}


horariosCtrl.getCitasEspecialista = async(req, res) => {
  try {
    let IdEspecialista = req.params.id
    await pool.query(`SELECT * FROM horarios WHERE id_especialista=?`,[IdEspecialista],
    (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        if (rows.length > 0) {
            console.log(rows)
            return res.status(200).send(rows);
        }
        else {
            res.send(false);
            
        }
    });

    return res.status(200).send({ message: "it works"})
  } catch (error) {
    console.error("Error happened\n", error)
    return res.status(500).send({error: "couldnt add sesion to the calendar"})
  }
}

horariosCtrl.addSessionPaciente = async(req, res) => {
  
  
  //Crear Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: 'off_session',
    amount: 1099,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
  });


}    
    // const attendeesEmails = [ { 'email': 'user1@example.com' }, { 'email': 'user2@example.com' } ]; 
    // const event = { 
      //   summary: 'Coding class', 
      //   location: 'Virtual / Google Meet', 
      //   description: 'Learn how to code with Javascript', 
//   start: { dateTime: '2022-01-18T09:00:00-07:00', timeZone: 'America/Los_Angeles', }, 
//   end: { dateTime: '2022-01-18T09:30:00-07:00', timeZone: 'America/Los_Angeles', }, 
//   attendees: attendeesEmails, 
//   reminders: { useDefault: false, 
//     overrides: [ { method: 'email', 'minutes': 24 * 60 }, 
//     { method: 'popup', 'minutes': 10 }, ], }, 
//     conferenceData: { 
//       createRequest: { 
  //         conferenceSolutionKey: {
//            type: 'hangoutsMeet' }, 
//            requestId: 'coding-calendar-demo' } 
//           }, 
//         }; 
        
        
    // const response = await calendar.events.insert({ 
    //   calendarId: 'primary', 
    //   resource: event, 
    //   conferenceDataVersion: 1 }); 

    // const { config: { data: { summary, location, start, end, attendees } }, 
    // data: { conferenceData } } = response; // Get the Google Meet conference URL in order to join the call const { uri } = conferenceData.entryPoints[0]; console.log(`📅 Calendar event created: ${summary} at ${location}, from ${start.dateTime} to ${end.dateTime}, attendees:\n${attendees.map(person => `🧍 ${person.email}`).join('\n')} \n 💻 Join conference call link: ${uri}`); });

module.exports = horariosCtrl;