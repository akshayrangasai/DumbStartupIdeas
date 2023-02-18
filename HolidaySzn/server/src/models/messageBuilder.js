import { Schema , model} from 'mongoose';

/* Collect a recipients data and schedule greetings for them. We collect phone (future options), 
email and occasion with some additional  details about the person passed on for gpt-3 to generate text 
*/
const messageBuildSchema = new Schema(
    {
    
        fromUser : {type : Schema.Types.ObjectId, ref: 'user', required : true },
        occasionId: {type : Schema.Types.ObjectId, ref: 'occasionModel', required : true },
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
        occasionDetails: {type : String},
        formatting : {type: Boolean}
    }
      
    );


/* This model gives us a message in an easy to send format, linked to MessageBuild just for easy reterival 
const emailMessageSchema = new Schema({

    messageBuilder : {type : Schema.Types.ObjectId, ref : 'messageBuildModel', required : true},
    fromName: {type : String, required : true},
    fromEmail: {type : String, required : true},
    toEmail: {type : String, required : true},
    toName: {type : String, required : true},
    subect : {type : String, required : true},
    emailContent : {type : String, required : true},
    occasionDate : {type : Date, required : true }

})
*/
    const messageBuildModel = model('messageBuildModel',messageBuildSchema);
    //const emailMessage = model('emailMessage', emailMessageSchema);

    module.exports = messageBuildModel