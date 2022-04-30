const pool = require('../database');

const horariosCtrl = {};

const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2('57432841693-mijbi1j1o5fmo3vm7t2jpuudjrdqkcov.apps.googleusercontent.com', 
'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'
)

oAuth2Client.setCredentials({
    refresh_token: 
    '1//04u_b6qPr-glACgYIARAAGAQSNgF-L9IrS1-TjE4Dc_08YZXwPK5c3bHjN139SaV-ZGfRs6_6PgTxTf85-dciZ_DCKSFxKsnTPg',
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

    if(descripcion == undefined) descripcion = ".";

    let sql = `INSERT INTO horarios(id_paciente, id_especialista, id_sesion, startTime, endTime, titulo, descripcion, precio) VALUES ('${idPaciente}', '${idEspecilista}', '${null}', '${startTime}', '${endTime}', '${eventName}', '${descripcion}', '${precio}');`;
    await pool.query(sql);

    return res.status(200).send({ message: "it works"})
  } catch (error) {
    console.error("Error happened\n", error)
    return res.status(500).send({error: "couldnt add sesion to the calendar"})
  }
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
        
        
//     const response = await calendar.events.insert({ 
//       calendarId: 'primary', 
//       resource: event, 
//       conferenceDataVersion: 1 }); 

//     const { config: { data: { summary, location, start, end, attendees } }, 
//     data: { conferenceData } } = response; // Get the Google Meet conference URL in order to join the call const { uri } = conferenceData.entryPoints[0]; console.log(`📅 Calendar event created: ${summary} at ${location}, from ${start.dateTime} to ${end.dateTime}, attendees:\n${attendees.map(person => `🧍 ${person.email}`).join('\n')} \n 💻 Join conference call link: ${uri}`); });

module.exports = horariosCtrl;