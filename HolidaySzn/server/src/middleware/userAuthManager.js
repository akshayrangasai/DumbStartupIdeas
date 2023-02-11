require('dotenv').config();
import user from '../models/user';

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

module.exports = {createOrModifyUser};