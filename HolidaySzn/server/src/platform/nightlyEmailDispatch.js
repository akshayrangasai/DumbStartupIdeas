import messageModel from '../models/messages'
import user from '../models/user'
import recepientModel from '../models/recepient'
import occasionModel from '../models/occasion'
import {greetingsFormat} from './messageFormatter';
import {sendEmail} from './emailHandler';


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

    //Run send email on this with each message with a from to etc


    res.send(results)

}

async function emailDispatchTest(req,res){

    /*
    console.log("Dispatch Called", req.body)
    res.send(req.body)
    */
    
    const results = await getMessagesForTheDay();
    const from = await user.findOne({_id:results[0].fromUser})
    const occasion = await occasionModel.findOne({_id: results[0].occasionId})
    const to = await recepientModel.findOne({toEmail: results[0].toEmail})

    console.log(from,to,occasion)
    const formattedResult = await greetingsFormat(results[0].message);
    //console.log(formattedResult)
    //const resulted = await gmailHandler("akshayrangasai.d@gmail.com", "akshayrangasai.d@gmail.com", "test email",formattedResult)
    res.send(formattedResult || "lol");

}

module.exports = {emailDispatch, emailDispatchTest}