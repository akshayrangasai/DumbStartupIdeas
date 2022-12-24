import { Schema , model } from 'mongoose';

const matchSchema = new Schema(
    {
    
        matchname : {type : String, required : true },
        password: {type : String, required : true },
        email : {type : String, required : true },

    }
      
    );

    const user = model('match',matchSchema);

    module.exports = match;