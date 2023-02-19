import messageModel from '../models/messages'
import user from '../models/user'
import finalEmailModel from '../models/finalEmail'
import recepientModel from '../models/recepient'
import occasionModel from '../models/occasion'
import {greetingsFormat} from './messageFormatter';
import {sendEmail, errorEmail} from './emailHandler';
//const recepientModel = require('../models/recepient');

async function updateSentEmails(finalEmailDoc)
{
    return new Promise(
        (resolve, reject) => {
    finalEmailModel.create(finalEmailDoc).then(data => {console.log(data);resolve(data)}).catch(err => {errorEmail("akshayrangasai.d@gmail.com", err);reject(err)});
})
}
async function getMessagesForTheDay(){
   
    const messageArray = await messageModel.aggregate([
        {
            $match:{
                $expr:
                {
                    $and :[
                        {$eq:[{$dayOfMonth : '$occasionDate'},{$dayOfMonth: new Date()}]},
                        {$eq:[{$month : '$occasionDate'},{$month: new Date()}]}
                    ]
                }
            }
        }
    ])

    return messageArray;
}

async function emailDispatch(req,res){

    const results = await getMessagesForTheDay();

    if(results.length>0){
    const emailsForTheDay = new Array();
    for(var i = 0; i< results.length; i++)
    {
        let fromEmail = results[i].fromEmail;
        let toEmail = results[i].toEmail;
        let fromName = results[i].fromName;
        let toName = results[i].toName;
        let recepient = await recepientModel.findOne({toEmail: toEmail});
        let emailSubject = results[i].emailSubject;
        let emailMessage = results[i].formattedMessage ? results[i].formattedMessage : await greetingsFormat(results[i].message);

        const emailSender = await sendEmail(fromEmail, toEmail, emailSubject, emailMessage);

        const emailUpdateDic = {
        recepientId: recepient._id,
        fromUser : results[i].fromUser,
        occasionId: results[i].occasionId,
        messageId : results[i]._id,
        toName: toName,
        toEmail : toEmail,
        emailSubject : emailSubject,
        emailBody :  emailMessage,
        emailDate: new Date(),
        emailId : emailSender.id,
        emailThreadId : emailSender.threadId,
        emailLabels : emailSender.labelIds,
        formatting : true

        }

        let updateData = await updateSentEmails(emailUpdateDic)
        emailsForTheDay.push(updateData);
        
        if(i == results.length -1)
        {
            console.log(emailsForTheDay);
            res.send(emailsForTheDay.map(data => {return data._id}));
        }

     }
    }
    else
    {
        res.json({})
    }


}

async function emailDispatchTest(req,res){

    emailDispatch(req,res);
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

module.exports = {emailDispatch, emailDispatchTest}