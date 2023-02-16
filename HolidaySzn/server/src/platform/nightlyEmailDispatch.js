import messageModel from '../models/messages'


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

    console.log("Dispatch Called", req.body)
    res.send(req.body)

    //const results = await getMessagesForTheDay();

    //res.send(results)

}

module.exports = {emailDispatch, emailDispatchTest}