
require('dotenv').config();
const {google} = require('googleapis');

async function sendMessage(messageData){

    const accessToken = process.env.EXAMPLE_GOOGLE_ACCESS_TOKEN;
    const authorization = "Bearer ";
    const gmail = google.gmail(
        {version: 'v1',
        headers : {
            Authorization : authorization.concat(accessToken)
        }
    });
       
var fromHeader = "From:";
var toHeader = "To:";
var subjectString = "Subject:";
const toEmail = toHeader.concat(messageData.toEmail);
const fromEmail = fromHeader.concat("Akshay Rangasai<",messageData.fromEmail,">");
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

sendMessage(mData);