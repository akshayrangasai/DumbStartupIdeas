import { Schema , model} from 'mongoose';

/* Collect a recipients data and schedule greetings for them. We collect phone (future options), 
email and occasion with some additional  details about the person passed on for gpt-3 to generate text 
*/
const emailSchema = new Schema(
    {
    
        fromUser : {type : Schema.Types.ObjectId, ref: 'user', required : true },
        occasionId: {type : Schema.Types.ObjectId, ref: 'occasionModel', required : true },
        messageId : {type : Schema.Types.ObjectId, ref: 'messageModel', required : true },
        emailSubject : {type : String, required : true},
        emailBody :  {type : String, required : true},
        emailDate: {type : Date, required : true },
        emailId : {type : String, required : true },
        emailThreadId : {type : String, required : true },
        emailLabels : {type : Array, required : true },
        formatting : {type: Boolean}
    }
      
    );

    const finalEmailModel = model('finalEmailModel',emailSchema);

    module.exports = finalEmailModel;