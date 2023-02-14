require('dotenv').config();
import user from '../models/user';
import { google } from 'googleapis';
var mongoose = require('mongoose');

async function createOrModifyUser(accessToken, refreshToken, profile)
{
    return new Promise(

        (resolve, reject) =>
        {


            const filter = {email: profile.email};
            user.findOne(filter).then(
                (data) => {
                    if(data)
                    {
                        user.findOneAndUpdate({email: profile.email},{name : profile.given_name, accessToken : accessToken, refreshToken : refreshToken, createdAt : new Date()},{new:true}).then(
                            (newAdd) => resolve(newAdd)
                        )
                    }
                    else
                    {
                        user.create({email: profile.email, name : profile.given_name, accessToken : accessToken, refreshToken : refreshToken, createdAt : new Date()}).then(
                            (newAdd) => resolve(newAdd)
                        )
                    }
                }
            ).catch(
                (err) => reject(err)
            )


        }


    )

}


async function getRefreshToken(userEmail)
{
    return new Promise(

        (resolve, reject) =>{
        
    if(mongoose.connection)
    {
        console.log('Conne');
    }
    else
    {   
        adhocConnection();
    }

    console.log('getRefreshToken',userEmail);

    //const filter = {email: userEmail};
    //console.log(filter);
    user.find({email : userEmail}).then(
    (userDetails)=>{

        console.log('filter ran')
    
    console.log(userDetails);

    console.log('hit try statement');
    const refreshToken = userDetails.refreshToken;
    resolve(refreshToken);
    
    }
    ).catch(
        (err => {console.log(err);reject(err)})
    );
});
}

async function adhocConnection()
{

const mongo_user = process.env.DB_USER;
const mongo_pwd = process.env.DB_PWD;
const mongo_url = process.env.DB_URL;

const mongoConnString = "mongodb+srv://"+mongo_user+":"+mongo_pwd+"@"+mongo_url;

mongoose.connect(mongoConnString);

const mongoConnection = mongoose.connection;

mongoConnection.on('error', (err) => {console.error.bind(console, 'Console Error'); return false});

mongoConnection.once('open',() => {return true});

}


module.exports = {createOrModifyUser, getRefreshToken};