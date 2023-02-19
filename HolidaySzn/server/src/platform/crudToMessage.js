const messageBuilderModel = require('../models/messageBuilder');
//import {messageBuilderModel, emailMessage} from '../models/messageBuilder';
const messageModel = require('../models/messages');
const occasionModel = require('../models/occasion');
import { greetingsFormat } from './messageFormatter';
import {findRecepientById} from '../crud/recepient';
import { findUserById } from '../crud/user';
import {getPoemFromPrompt} from './openAPI';
import { sendEmail } from './emailHandler';

/*
const messageBuildSchema = new Schema(
    {
    
        fromUser : {type : Schema.Types.ObjectId, ref: 'user', required : true },
        occasionId: {type : Schema.Types.ObjectId, ref: 'occasion', required : true },
        name : {type : String, required : true},
        fromEmail: {type : String, required : true},
        fromName : {type : String, required : true},
        toEmail : {type : String, required : true },
        toName : {type : String, required : true},
        toPhone : {type : String},
        toName : {type : String, required : true },
        occasionDate: {type : Date, required : true },
        toDetails : {type : String },
        occasionName : {type : String, required: true},
        occasionDetails: {type : String} 
    }
*/
async function buildMessageFromPrompt(prompt, messageInfo)
{
    const message = await getPoemFromPrompt(prompt);
    const formattedMessage = await greetingsFormat(message);
    return new Promise((resolve,reject) => {
        const messageData = {
        fromUser : messageInfo.fromUser,
        occasionId: messageInfo.occasionId,
        fromEmail: messageInfo.fromEmail,
        fromName : messageInfo.fromName,
        toEmail : messageInfo.toEmail,
        toName : messageInfo.toName,
        emailSubject : messageInfo.occasionName + " greetings from " + messageInfo.fromName,
        occasionDate: messageInfo.occasionDate,
        message:  message,
        formattedMessage : formattedMessage,
        //formatting : false,
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
        fromName : user.name,
        toEmail : recepient.toEmail,
        toName: recepient.toName,
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
            //console.log(prompt);
            
            buildMessageFromPrompt(prompt,messageInfo).then(
                (messageSuccess) => 
                {
                    //console.log("success", messageSuccess)
                    //sendEmail(messageSuccess.fromEmail,  messageSuccess.toEmail, "Happy birthday from " + messageBuilderMessage.name, messageSuccess.message);
                }
                ).catch((err) => console.log(err))
        }

    ).catch((err) => console.log(err))



}

module.exports = {insertMessage}