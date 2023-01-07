/* Generic email handler where we can use either sendgrid or the user gmail to send email. Instead of hanving email code everywhere, we can just use email handler to send emails*/

require('dotenv').config();
var sgMail = require('@sendgrid/mail');
//sgMail is for sendgrid email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
/* Mailman tells us who will send the email - Sendgrid or gmail - 1 implies sedngrid, 0 implies gmail. Currently configured for Sendgrid on default */
const mailMan = async () => 
{
    return new Promise((resolve, reject) => {




        resolve(true)
    }

    )
}

const sendEmail = async (from, to, subject, message) => {

    const sendGrid = await mailMan()
    if(SendGrid)
    {
        try{

            const response = await sendGridHandler(from, to, subject, message)
            return new Promise((resolve, reject) => resolve(response))
            
            }
            catch(err)
            {
                return new Promise((resolve, reject) => reject(err))
            }
    }
    else
    {
            //sendgmail
    }
}

const gmailHandler = () =>
{

}

const sendGridHandler = async (from, to, subject, message) =>
{
    
    return new Promise((resolve, reject) =>{
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
        resolve(response);
        }
        )["catch"]
        (
            function (error) 
            {
                reject(error);
            }
        );
})
}

module.exports = {sendEmail}