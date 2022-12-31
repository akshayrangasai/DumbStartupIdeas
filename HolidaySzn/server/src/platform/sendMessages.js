import axios from 'axios';
import {findUser} from '../crud/user';
import messageModel from '../models/messages';
const {google} = require('googleapis');
const gmail = google.gmail('v1');

const googleClient = new google.auth.OAuth2();

async function sendMessage(messageData){

    const userData = await findUser(messageData.fromEmail);
    const refresh_token = userData.refreshToken; 
    googleClient.setCredentials({
    refresh_token: refresh_token
});

var fromHeader = "From:";
var toHeader = "To:";
var subjectString = "Subject:";
const toEmail = toHeader.concat(messageData.toEmail);
const fromEmail = fromHeader.concat(userData.name,"<",messageData.fromEmail,">");
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
    'test',
    message
];

const finalMessage = messageParts.join('\n');

const encodedMessage = Buffer.from(finalMessage)
.toString('base64')
.replace(/\+/g, '-')
.replace(/\//g, '_')
.replace(/=+$/, '');

const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
  console.log(res.data);
  return res.data;

}

module.exports = sendMessage;