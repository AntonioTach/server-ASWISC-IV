const horariosCtrl = {};

const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2('57432841693-mijbi1j1o5fmo3vm7t2jpuudjrdqkcov.apps.googleusercontent.com', 
'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'
)

oAuth2Client.setCredentials({
    refresh_token: 
    '1//046DzW408YyPZCgYIARAAGAQSNgF-L9IrREZKofmb9BbVXRuWaKK-cyg1kM0ibowQv310kGogtEXZAfVkE7NfN77xSXLxfbpxcw',
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

horariosCtrl.generarVideollamada = async (req, res) => {    

    const eventStartTime = new Date();
    eventStartTime.setDate(eventStartTime.getDate() + 2); //Tomorrow 

    const eventEndTime = new Date();
    eventEndTime.setDate(eventStartTime.getDate() + 2); 
    eventEndTime.setDate(eventEndTime.getDate()); //60 minutes later

    // console.log('Start date: ', eventStartTime);
    // console.log('End date: ', eventEndTime);

    //Configuration 
    const event = {
        summary : 'Segunda prueba Tach', 
        description: 'Test with Google Meet Gio and Tach love for all people',
        start : {
            dateTime : '2022-04-26T09:00:00-09:00',
            timeZone: 'America/Mexico_City',
        },
        end : {
            dateTime: '2022-04-26T09:00:00-10:00',
            timeZone: 'America/Mexico_City',
        },
        colorId: 1,
        attendees: [
            {'email': 'antach.vihe@gmail.com'}, //Email Especialista
            {'email': 'giovannienriquezp13@gmail.com'}  //Email Paciente
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
            timeMin: '2022-04-26T09:00:00-09:00',
            timeMax: '2022-04-26T09:00:00-10:00',
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