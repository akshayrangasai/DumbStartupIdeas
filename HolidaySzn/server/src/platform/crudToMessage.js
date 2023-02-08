const messageBuilderModel = require('../models/messageBuilder');
const messageModel = require('../models/messages');
const occasionModel = require('../models/occasion');
import {findRecepientById} from '../crud/recepient';
import { findUserById } from '../crud/user';
import {getPoemFromPrompt} from './openAPI';
import { sendEmail } from './emailHandler';


async function buildMessageFromPrompt(prompt, messageInfo)
{
    const message = await getPoemFromPrompt(prompt);
    
    return new Promise((resolve,reject) => {
        const messageData = {
        fromUser : messageInfo.fromUser,
        occasionId: messageInfo.occasionId,
        fromEmail: messageInfo.fromEmail,
        toEmail : messageInfo.toEmail,
        //toPhone : {type : String},
        occasionDate: messageInfo.occasionDate,
        message:  message,
        sentStatus: false
    };


    messageModel.create(messageData).then((data) => resolve(data)).catch((err) => reject(err));

    })
}

async function insertMessage(occasion)
{

    const user = await findUserById(occasion.fromUser);
    const recepient = await findRecepientById(occasion.recepientDetails);

    const messageBuilderMessage =
    {
        fromUser : occasion.fromUser,
        occasionId: occasion._id,
        name : user.name,
        fromEmail: user.email,
        toEmail : recepient.toEmail,
        toPhone : recepient.toPhone,
        toName : recepient.toName,
        occasionDate: occasion.occasionDate,
        toDetails : recepient.toDetails,
        occasionName : occasion.occasionName,
        occasionDetails: occasion.occasionDetails
    };

    messageBuilderModel.create(messageBuilderMessage).then(
        
        (messageInfo) => {

            let intro = "Create a poem for my friend ";
            const prompt = intro.concat(messageInfo.toName," for their ", messageInfo.occasionName, ".  ", messageInfo.toName, " is ", messageInfo.toDetails ," type of person.",  messageInfo.occasionDetails?(messageInfo.occasionName + " is special because of " + messageInfo.occasionDetails):"");
            console.log(prompt);
            
            buildMessageFromPrompt(prompt,messageInfo).then(
                (messageSuccess) => 
                {
                    console.log("success", messageSuccess)
                    sendEmail(messageSuccess.fromEmail,  messageSuccess.toEmail, "Happy birthday from " + messageBuilderMessage.name, messageSuccess.message);
                }
                ).catch((err) => console.log(err))
        }

    ).catch((err) => console.log(err))



}

module.exports = {insertMessage}