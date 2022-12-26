import { Schema , model } from 'mongoose';

const userSchema = new Schema(
    {
    
        username : {type : String, required : true, unique : true },
        password: {type : String, required : true },
        email : {type : String, required : true, unique : true },
        createdAt : {type : Date, required : true}

    }
      
    );

    const user = model('user',userSchema);

    module.exports = user;