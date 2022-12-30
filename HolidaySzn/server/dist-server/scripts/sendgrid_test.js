"use strict";

var _openai = require("openai");
require('dotenv').config();
var sgMail = require('@sendgrid/mail');
var configuration = new _openai.Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY
});
var openai = new _openai.OpenAIApi(configuration);
openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Write a birthday poem for my friend Genevieve. She makes candles, has perfect grades and does not have an asian hobby",
  temperature: 0.4,
  max_tokens: 1500,
  top_p: 1.0,
  frequency_penalty: 0.4,
  presence_penalty: 0.0
}).then(function (response) {
  console.log(response.data.choices[0].text);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  var msg = {
    to: 'grogers@mit.edu',
    // Change to your recipient
    from: 'no-reply@dumbstartupideas.com',
    // Change to your verified sender
    subject: 'Happy birthday, Genevieve!',
    html: response.data.choices[0].text
  };
  sgMail.send(msg).then(function () {
    console.log('Email sent to', msg.to, response);
  })["catch"](function (error) {
    console.error(error);
  });
});