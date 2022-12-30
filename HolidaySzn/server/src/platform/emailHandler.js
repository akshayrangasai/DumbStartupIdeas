/* Generic email handler where we can use either sendgrid or the user gmail to send email. Instead of hanving email code everywhere, we can just use email handler to send emails*/

require('dotenv').config();
var sgMail = require('@sendgrid/mail');
//sgMail is for sendgrid email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
/* Mailman tells us who will send the email - Sendgrid or gmail - 1 implies sedngrid, 0 implies gmail. Currently configured for Sendgrid on default */
const mailMan = () => 
{
    return new Promise((resolve, reject) => {

        resolve(1)
    }

    )
}

const sendEmail = (from, to, subject, message) => {

    mailMan().then( (SendGrid) => {

        if(SendGrid)
        {
            const msg = {
                to : to,
                // Change to your recipient
                from: 'no-reply@dumbstartupideas.com',
                // Change to your verified sender
                subject: subject,
                //text : text,
                html: message
            };
            
            sgMail.send(msg)
            .then(
                function (response) 
                {
                console.log('Email sent to', msg.to, response);
                }
                )["catch"]
                (
                    function (error) 
                    {
                        console.error(error);
                    }
                );
        }
        else
        {
                //sendgmail
        }
    }
    ).catch
    (
        (err) => console.log(err)
    );

}

module.exports = {sendEmail}