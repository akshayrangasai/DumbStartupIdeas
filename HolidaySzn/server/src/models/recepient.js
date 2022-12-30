import { Schema , model} from 'mongoose';

/* Collect a recipients data and schedule greetings for them. We collect phone (future options), 
email and occasion with some additional  details about the person passed on for gpt-3 to generate text 
*/
const recepientSchema = new Schema(
    {
    
        fromUser : {type : Schema.Types.ObjectId, ref: 'user', required : true },
        /*Pass user id for match - can autopopulate with session data*/
        toEmail : {type : String, required : true },
        toPhone : {type : String},
        toName : {type : String, required : true },
        toDetails : {type : String },

    }
      
    );

    const recepientModel = model('recepientModel',recepientSchema);

    module.exports = recepientModel;