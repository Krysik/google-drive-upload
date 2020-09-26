const express = require('express');
const { google } = require('googleapis');
const {
  client_id,
  client_secret,
  redirect_uris
} = require('./credentials').credentials;

const app = express();

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris,
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log("AUTH URL =>", authUrl);

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  if (code) {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.redirect('/api/upload')
  } else {
    res.json({error: 'No code in params'})
  }
});

app.get('/api/upload', (req, res) => {
  res.json({message: "You can upload files to your drive"})
})


app.get('/health-check', (req, res) => {
  res.json({status: "Ok"})
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
