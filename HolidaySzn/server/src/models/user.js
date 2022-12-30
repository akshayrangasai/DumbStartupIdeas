import { Schema , model } from 'mongoose';
var findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema(
    {
    
        name : {type : String, required : true},
        email : {type : String, required : true, unique : true },
        createdAt : {type : Date, required : true},
        accessToken : {type : String, required : true},
        refreshToken : {type : String},

    }
      
    );

    userSchema.plugin(findOrCreate);

    const user = model('user',userSchema);

    module.exports = user;