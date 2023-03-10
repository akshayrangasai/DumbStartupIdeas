"use strict";

/* Generic email handler where we can use either sendgrid or the user gmail to send email. Instead of hanving email code everywhere, we can just use email handler to send emails*/

require('dotenv').config();
var sgMail = require('@sendgrid/mail');
//sgMail is for sendgrid email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* Mailman tells us who will send the email - Sendgrid or gmail - 1 implies sedngrid, 0 implies gmail. Currently configured for Sendgrid on default */
var mailMan = function mailMan() {
  return new Promise(function (resolve, reject) {
    resolve(1);
  });
};
var sendEmail = function sendEmail(from, to, subject, message) {
  var text = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  mailMan().then(function (SendGrid) {
    if (SendGrid) {
      var msg = {
        to: to,
        // Change to your recipient
        from: 'no-reply@dumbstartupideas.com',
        // Change to your verified sender
        subject: subject,
        text: text,
        html: message
      };
      sgMail.send(msg).then(function (response) {
        console.log('Email sent to', msg.to, response);
      })["catch"](function (error) {
        console.error(error);
      });
    } else {
      //sendgmail
    }
  })["catch"](function (err) {
    return console.log(err);
  });
};
module.exports = {
  sendEmail: sendEmail
};