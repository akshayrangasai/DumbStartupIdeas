import { Schema , model} from 'mongoose';

const dateSchema = new Schema(
    {
    
        /* dateUser :
        Should we add a user here so we can just get a list of all dates for the user?
        */
       
        dateMatch : {type : Schema.Types.ObjectId, ref : 'matchModel',  required : true },
        /*Pass user id for match - can autopopulate with session data*/
        dateDate: {type : Date, required : true },


    }
      
    );

    const dateModel = model('dateModel',dateSchema);

    module.exports = dateModel;