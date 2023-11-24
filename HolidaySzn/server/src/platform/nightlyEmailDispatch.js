import messageModel from '../models/messages'
import user from '../models/user'
import finalEmailModel from '../models/finalEmail'
import recepientModel from '../models/recepient'
import occasionModel from '../models/occasion'
import { greetingsFormat } from './messageFormatter';
import { sendEmail, errorEmail } from './emailHandler';
//const recepientModel = require('../models/recepient');

async function updateSentEmails(finalEmailDoc) {
    return new Promise(
        (resolve, reject) => {
            finalEmailModel.create(finalEmailDoc).then(data => { resolve(data) }).catch(err => { errorEmail("akshayrangasai.d@gmail.com", err); reject(err) });
        })
}
async function getMessagesForTheDay() {

    const messageArray = await messageModel.aggregate([
        {
            $match: {
                $expr:
                {
                    $and: [
                        { $eq: [{ $dayOfMonth: '$occasionDate' }, { $dayOfMonth: new Date() }] },
                        { $eq: [{ $month: '$occasionDate' }, { $month: new Date() }] }
                    ]
                }
            }
        }
    ])

    return messageArray;
}

async function emailDispatch(req, res) {

    const results = await getMessagesForTheDay();
    console.log("got messages for day")

    if (results.length > 0) {
        const emailsForTheDay = new Array();
        for (var i = 0; i < results.length; i++) {
            let fromEmail = results[i].fromEmail;
            let toEmail = results[i].toEmail;
            let fromName = results[i].fromName;
            let toName = results[i].toName;
            let recepient = await recepientModel.findOne({ toEmail: toEmail });
            let emailSubject = results[i].emailSubject;
            let emailMessage = results[i].formattedMessage ? results[i].formattedMessage : await greetingsFormat(results[i].message);

            const emailSender = await sendEmail(fromEmail, toEmail, emailSubject, emailMessage);

            //below sends a notification that an email has been sent when we run this dispatch automatically
            let notificationSubject = "[greetings.ai] notification for " + toEmail;
            let notificationMessage = "greetings sent to " + toEmail + "with subject " + emailSubject;
            try {
                const notifySend = await sendEmail(fromEmail, fromEmail, notificationSubject, notificationMessage);
                console.log(notificationSubject);
            }
            catch (e) {
                console.log(e);
            }
            const emailUpdateDic = {
                recepientId: recepient._id,
                fromUser: results[i].fromUser,
                occasionId: results[i].occasionId,
                messageId: results[i]._id,
                toName: toName,
                toEmail: toEmail,
                emailSubject: emailSubject,
                emailBody: emailMessage,
                emailDate: new Date(),
                emailId: emailSender.id,
                emailThreadId: emailSender.threadId,
                emailLabels: emailSender.labelIds,
                formatting: true,
                autoSend: true

            }

            let updateData = await updateSentEmails(emailUpdateDic)
            emailsForTheDay.push(updateData);

            if (i == results.length - 1) {
                //console.log(emailsForTheDay.length);

                res.send(emailsForTheDay.map(data => { return data._id }));
            }

        }
    }
    else {
        res.json({})
    }


}

async function emailBulkDispatchTest(req, res) {
    const resposne = await emailDispatch(req, res)
}

async function emailDispatchTest(req, res) {

    const occasionId = req.params.id;

    try {
        const messageData = await messageModel.findOne({ occasionId: occasionId });

        let emailSubject = messageData.emailSubject;
        let emailMessage = messageData.formattedMessage;
        let fromEmail = req.user.email;
        let toEmail = messageData.toEmail;

        console.log(toEmail)

        const emailSender = await sendEmail(fromEmail, toEmail, emailSubject, emailMessage);
        let recepient = await recepientModel.findOne({ toEmail: toEmail });

        //below sends a notification that an email has been sent when we run this dispatch automatically
        let notificationSubject = "[greetings.ai] notification for " + toEmail;
        let notificationMessage = "greetings sent to " + toEmail + "with subject " + emailSubject;
        try {
            const notifySend = await sendEmail(fromEmail, fromEmail, notificationSubject, notificationMessage);
            console.log(notificationSubject);
        }
        catch (e) {
            console.log(e);
        }

        const emailUpdateDic = {
            recepientId: recepient._id,
            fromUser: messageData.fromUser,
            occasionId: messageData.occasionId,
            messageId: messageData._id,
            toName: messageData.toName,
            toEmail: toEmail,
            emailSubject: emailSubject,
            emailBody: emailMessage,
            emailDate: new Date(),
            emailId: emailSender.id,
            emailThreadId: emailSender.threadId,
            emailLabels: emailSender.labelIds,
            formatting: true,
            autoSend: false

        }

        let updateData = await updateSentEmails(emailUpdateDic)
        console.log(updateData);
        res.send(emailSender);
    }
    catch (err) {
        res.sendStatus(500);
    }

    //emailDispatch(req,res);
    /*
    console.log("Dispatch Called", req.body)
    res.send(req.body)
    */

    /*const results = await getMessagesForTheDay();
    const from = await user.findOne({_id:results[0].fromUser})
    const occasion = await occasionModel.findOne({_id: results[0].occasionId})
    const to = await recepientModel.findOne({toEmail: results[0].toEmail})

    console.log(from,to,occasion)
    const formattedResult = await greetingsFormat(results[0].message);
    //console.log(formattedResult)
    const resulted = await sendEmail("akshayrangasai.d@gmail.com", "akshayrangasai.d@gmail.com", "Happy " +occasion.occasionName + " " + to.toName,formattedResult)
    console.log(resulted)
    res.send(formattedResult || "lol");
    */
}

//Adding a comment here for a push to github to keep the action alive

module.exports = { emailDispatch, emailDispatchTest, emailBulkDispatchTest }