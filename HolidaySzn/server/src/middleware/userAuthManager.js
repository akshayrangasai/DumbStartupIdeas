require('dotenv').config();
import user from '../models/user';
import { google } from 'googleapis';
import sendEmail from '../platform/emailHandler';
var mongoose = require('mongoose');
const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT = process.env.GOOGLE_CLIENT_ID;

var redirectURL = process.env.BASE_URL + '/auth/google/';
//redirectURL = concat(process.env.BASE_URL,redirectURL);

var authClient = new google.auth.OAuth2(
    GOOGLE_CLIENT,
    GOOGLE_SECRET,
    redirectURL
);

async function createOrModifyUser(accessToken, refreshToken, profile, scopesGiven, sendEmailPermission) {
    //console.log(refreshToken);
    return new Promise(

        (resolve, reject) => {


            const filter = { email: profile.email };
            //console.log(filter);
            user.findOne(filter).then(
                (data) => {
                    if (data) {
                        user.findOneAndUpdate({ email: profile.email }, { name: profile.given_name, accessToken: accessToken, refreshToken: refreshToken, modifiedAt: new Date(), scopes: scopesGiven, canSendEmail: sendEmailPermission, image: profile.picture || null }, { new: true }).then(
                            (newAdd) => { resolve(newAdd) }
                        )
                    }
                    else {
                        user.create({ email: profile.email, name: profile.given_name, accessToken: accessToken, refreshToken: refreshToken, createdAt: new Date(), modifiedAt: new Date(), scopes: scopesGiven, canSendEmail: sendEmailPermission, image: profile.picture || null }).then(
                            (newAdd) => {
                                //sendEmail('akshayrangasai.d@gmail.com', 'notifications@dumbstartupideas.com', "New Signup " + profile.given_name, "details :" +data ).then(
                                //  (resp) => {console.log('email sent');resolve(newAdd)});

                                resolve(newAdd)
                            }
                        )
                    }
                }
            ).catch(
                (err) => reject(err)
            )


        }


    )

}

async function getConnection() {
    return new Promise(
        (resolve, reject) => {
            if (mongoose.connection.readyState == 0) {
                const mongo_user = process.env.DB_USER;
                const mongo_pwd = process.env.DB_PWD;
                const mongo_url = process.env.DB_URL;

                const mongoConnString = "mongodb+srv://" + mongo_user + ":" + mongo_pwd + "@" + mongo_url;

                mongoose.connect(mongoConnString);

                const mongoConnection = mongoose.connection;

                mongoConnection.on('error', (err) => { console.error.bind(console, 'Console Error'); reject(err) });

                mongoConnection.once('open', () => { resolve(mongoConnection) });

            }
            else {
                resolve(mongoose.connection);

            }

        }
    )
}

async function getRefreshToken(userEmail) {
    //console.log('get rr called');
    //console.log('getRefreshToken',userEmail);

    const mongoConn = await getConnection();
    //console.log(mongoConn);

    return new Promise(
        (resolve, reject) => {
            //const filter = {email: userEmail};
            //console.log(filter);
            user.findOne({ email: userEmail }).then(

                (userDetails) => {

                    //Check if refresh token is valid 

                    authClient.setCredentials({
                        refresh_token: data.refreshToken
                    });

                    let csEmail = false;

                    //console.log('filter ran')

                    //console.log(userDetails);

                    //console.log('hit try statement');
                    const resData = {
                        refreshToken: userDetails.refreshToken,
                        canSendEmail: userDetails.refreshToken || false
                    };
                    //console.log(refreshToken);
                    resolve(resData);

                }
            ).catch(
                (err => { console.log(err); reject(err) })
            );
        })
}



module.exports = { createOrModifyUser, getRefreshToken };