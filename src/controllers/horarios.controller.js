const horariosCtrl = {};

const { google } = required('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2('199421933679-9jhp14gkvnk5plslrlbcl573lvp0s7b6.apps.googleusercontent.com', 
'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'
)

oAuth2Client.setCredentials({
    refresh_token: 
    '1//044rxikaQEfFkCgYIARAAGAQSNwF-L9IrfzQ6gLiyQN3y5-XU2UN4RGDfdBivG935FYJYuS82gLYXZvdrJamjng-Nl3pSC1OShKs',
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

horariosCtrl.generarVideollamada = async (req, res) => {

}

module.exports = horariosCtrl;