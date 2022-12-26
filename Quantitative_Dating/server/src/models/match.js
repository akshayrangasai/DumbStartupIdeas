import { Schema , model } from 'mongoose';

const matchSchema = new Schema(
    {
    
        matchUser : {type : String, required : true },
        /*Pass user id for match - can autopopulate with session data*/
        matchName : {type : String, required : true },
        matchDate: {type : Date, required : true },
        matchSource : {type : String, required : true },
        matchSourceDetails : {type : String},
        matchNotes: {type : String},


    }
      
    );

    const matchModel = model('matchModel',matchSchema);

    module.exports = matchModel;