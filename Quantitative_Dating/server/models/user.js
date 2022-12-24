import { Schema , Model, model } from 'mongoose';

const userSchema = new Schema(
    {
    
        username : {type : String, required : true },
        password: {type : String, required : true },
        email : {type : String, required : true },

    }
      
    );

    const user = model('user',userSchema);

    module.exports = user;