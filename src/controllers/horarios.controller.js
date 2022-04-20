const horariosCtrl = {};

const { google } = required('googleapis');

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
    eventEndTime.setDate(eventEndTime.getDate() + 60); //60 minutes later

    //Configuration 
    const event = {
        sumary : 'Meeting', 
        description: 'Test Meet',
        start : {
            dateTime : eventStartTime,
            timeZone: 'America/Mexico_City',
        },
        end : {
            dateTime: eventEndTime,
            timeZone: 'America/Mexico_City',
        },
        colorId: 1
    };
}

module.exports = horariosCtrl;