
require('dotenv').config({path: __dirname+'/../../.env'});
import {getRefreshToken} from '../middleware/userAuthManager';
const {google} = require('googleapis');  

//console.log(process.env);

var redirectURL = process.env.BASE_URL+'/auth/google/';
    //redirectURL = concat(process.env.BASE_URL,redirectURL);

var authClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectURL
    );

    authClient.setCredentials({
      refresh_token : "1//01_9sQApfW0GRCgYIARAAGAESNwF-L9IrNUcDAH3_Nq6-6GwHfafLMVrOXePhlQe-lG9yGMDQ3okaaxt1fVgpQcipNiTGbuvWWPk"
    });

async function constructMessage(messageData)
{
var fromHeader = "From:";
var toHeader = "To:";
var subjectString = "Subject:";
const toEmail = toHeader.concat(messageData.toEmail);
const fromEmail = fromHeader.concat("<",messageData.fromEmail,">");
const contentType = 'Content-Type: text/html; charset=utf-8';
const mimeVersion = 'MIME-Version: 1.0';
const subject = '🤘 Hello 🤘';
const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
const subjectToSend = subjectString.concat(utf8Subject);
const message = messageData.message;

const messageParts = [
    fromEmail,
    toEmail,
    contentType,
    mimeVersion,
    subjectToSend,
    '',
    message
];

const finalMessage = messageParts.join('\n');

const encodedMessage = Buffer.from(finalMessage)
.toString('base64')
.replace(/\+/g, '-')
.replace(/\//g, '_')
.replace(/=+$/, '');

return encodedMessage;

}    


async function applyRefreshToken(email){

  return new Promise((resolve, reject) =>{
  
  
  getRefreshToken(email).then(
    
  (refreshToken) =>{;
  console.log('Returned Refresh Token',refreshToken);

  authClient.setCredentials({
    refresh_token : refreshToken
  });

  resolve(authClient);
}).catch(err => reject(err))

}
  );
}

async function sendMessage(messageData){


  //const localAuthClient = await applyRefreshToken(messageData.fromEmail);
  //console.log(localAuthClient);

    //const accessToken = process.env.EXAMPLE_GOOGLE_ACCESS_TOKEN;
    //const authorization = "Bearer ";
    
    const gmail = google.gmail(
      {
        version:'v1',
        auth : authClient
      }
    );

    const encodedMessage = await constructMessage(messageData);
       


const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
  console.log(res.data);

  return res.data;

}


const mData =   {
    
  "fromEmail": "akshayrangasai.d@gmail.com",
  "toEmail": "akshayrangasai.d@gmail.com",
  "message": " today\n\nAkshay Rangasai, your birthday's here\nA day to celebrate and cheer\nYour friends and family all around\nTo wish you joy and happiness abound\n\nYour kindness and your gentle heart\nWill always keep us close apart\nYour intelligence and wit so sharp\nWill always make us laugh and carp \n\nSo on this special day of yours \nWe toast to you with open doors \nWe wish you luck, we wish you health \nAnd all the joys that life can bring to wealth \nHappy Birthday Akshay Rangasai!",
  
};

sendMessage(mData)
