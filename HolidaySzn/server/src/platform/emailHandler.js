/* Generic email handler where we can use either sendgrid or the user gmail to send email. Instead of hanving email code everywhere, we can just use email handler to send emails*/
require('dotenv').config();
var sgMail = require('@sendgrid/mail');
import {getRefreshToken, getuserEmailPermissions} from '../middleware/userAuthManager';
const {google} = require('googleapis');

//sgMail is for sendgrid email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT = process.env.GOOGLE_CLIENT_ID;

var redirectURL = process.env.BASE_URL+'/auth/google/';
    //redirectURL = concat(process.env.BASE_URL,redirectURL);

var authClient = new google.auth.OAuth2(
        GOOGLE_CLIENT,
        GOOGLE_SECRET,
        redirectURL
    );
  


/* Mailman tells us who will send the email - Sendgrid or gmail - 1 implies sedngrid, 0 implies gmail. Currently configured for Sendgrid on default */
const mailMan = async (from) => 
{
    return new Promise((resolve, reject) => {

        getRefreshToken(from).then(
            (data) => {
            if(data.canSendEmail){
              authClient.setCredentials({
                refresh_token : data.refreshToken
              });
              
              const oauth2 = google.oauth2('v2');
              
              oauth2.userinfo.get({auth:authClient}).then(
                (data) => resolve(false)
              )
            }else{
                
                resolve(true)
                console.log(from, "Can't send emails from gmail");
            }

             }).catch(
                err => {
                    console.log("Gmail Token Error", err);
                    resolve(true)
                }
             ); 
    }

    )
}

const sendEmail = async (from, to, subject, message) => {
    
    const sendGrid = await mailMan(from);

    //console.log('email handler called', sendGrid);
    if(sendGrid)
    {
        try{
            const response = await sendGridHandler(from, to, subject, message)
            const errorMessage = "Hello there, <br> There seems to be an error in your greetings gmail credentials, and we weren't able to send your message. Please login to check what's happening to resume services";
            const Errorresponse = await sendGridErrorHandler(from, to, "Please check your credentials on greetings", errorMessage)
            //console.log(response);
            return new Promise((resolve, reject) => resolve(response))
            
            }
            catch(err)
            {
                return new Promise((resolve, reject) => reject(err))
            }
    }
    else
    {
        try{
            const response = await gmailHandler(from, to, subject, message);
            //console.log(response);
            return new Promise((resolve, reject) => resolve(response))
            
            }
            catch(err)
            {
                console.log(err);
                return new Promise((resolve, reject) => reject(err))
            }
            
    }
}

const gmailHandler = async (from, to, subject, message) =>
{
    
    const encodedMessage = await constructMessage(from,to,subject,message);

    return new Promise(
    (resolve, reject) => {

        getRefreshToken(from).then(
        (data) => {
            authClient.setCredentials({
            refresh_token : data.refreshToken
            });
            

            const gmail = google.gmail(
            {
                version:'v1',
                auth : authClient
            }
            ); 
        gmail.users.messages.send({
            userId: 'me',
            requestBody: {
            raw: encodedMessage,
            },
        }).then(
            (res) =>
            {
            resolve(res.data);
        
            //return res.data;
            }
        ).catch(err => {
            
            console.log(err); 
            try{
            sendGridErrorHandler(from, to, subject, err).then(data => reject(err));    
            }
            catch(errormax)
            {
                reject(errormax)
            }         

        })
        
        }
        )
    }
    )
}

const sendGridHandler = async (from, to, subject, message) =>
{
    if(!sgMail)
    {
        var sgMail = require('@sendgrid/mail');
    }
    
    console.log('email sendgrid function called')
    
        
    
    //This is an error message
    return new Promise((resolve, reject) =>{
    const msg = {
        to : from,
        from: 'no-reply@dumbstartupideas.com',
        subject: subject || "email to " + to + "failed",
        text : subject,
        html: message
    };
    
    sgMail.send(msg)
    .then(
        function (response) 
        {
        console.log('email sendgrid success')
        resolve(response);
        }
        )["catch"]
        (
            function (error) 
            {
                console.log(error);
                reject(error);
            }
        );
})
}

const sendGridErrorHandler = async (from, to, subject, message) =>
{
    //This is an error message
    return new Promise((resolve, reject) =>{
    const msg = {
        to : from,
        from: 'no-reply@dumbstartupideas.com',
        subject: "Error in your google credentials in greetings",
        //text : subject,
        html: "The error is" + message
    };
    
    sgMail.send(msg)
    .then(
        function (response) 
        {
        resolve(response);
        }
        )["catch"]
        (
            function (error) 
            {
                console.log(error);
                reject(error);
            }
        );
})
}

const errorEmail = (email, error) =>
{
    sendGridErrorHandler("no-reply@dumbstartupideas.com", email, "Error in your google credentials for greetings.ai", error).then((data) => console.log(data) );
}


async function constructMessage(from, to, subject, message)
{
var fromHeader = "From:";
var toHeader = "To:";
var subjectString = "Subject:";
const toEmail = toHeader.concat(to);
const fromEmail = fromHeader.concat("<",from,">");
const contentType = 'Content-Type: text/html; charset=utf-8';
const mimeVersion = 'MIME-Version: 1.0';
const subject_message = subject || '🤘 Greetings 🤘';
const utf8Subject = `=?utf-8?B?${Buffer.from(subject_message).toString('base64')}?=`;
const subjectToSend = subjectString.concat(utf8Subject);
//const message = message;

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

module.exports = {sendEmail, errorEmail, sendGridErrorHandler, sendGridHandler}
export default sendEmail