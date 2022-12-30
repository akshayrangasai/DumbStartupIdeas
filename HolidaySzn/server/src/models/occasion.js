import { Schema , model} from 'mongoose';

/* Collect a recipients data and schedule greetings for them. We collect phone (future options), 
email and occasion with some additional  details about the person passed on for gpt-3 to generate text 
*/
const occasionSchema = new Schema(
    {
    
        fromUser : {type : Schema.Types.ObjectId, ref: 'user', required : true },
        /*Pass user id for match - can autopopulate with session data or do we just do recepient data and build from there?*/
        recepientDetails : {type: Schema.Types.ObjectId, ref: 'recepientModel', required:true},
        occasionDate: {type : Date, required : true },
        occasionDetails: {type : String}, 
        occasionName : {type : String, required: true},
        createdAt : {type: Date, required : true}

    }
      
    );

    const occasionModel = model('occasionModel',occasionSchema);

    module.exports = occasionModel;