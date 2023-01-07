const recepientModel = require("../models/recepient");
import { findUser } from "./user";

const findAllRecepients = (req,res) =>
{
    //console.log();
    let userEmail = req.user.doc.email; 
    findUser( userEmail ).then
                    (
                        (user) => 
                        {
                        const recepientData = 
                            {
                                fromUser : user._id
                            }
                        recepientModel.find(recepientData).then((data) => res.send(data))
                        }
                    ).catch(
                        (err) => res.send(err)
                    )

}

const findRecepientById = (Id) =>
{
    return new Promise((resolve,reject) => {
                        
        const recepientData = 
            {
                _id : Id
            }
        recepientModel.findOne(recepientData)
        .then(
            (data) => resolve(data)
            )
        .catch(
        
            (err) => reject(err)
            
            )
    });

}

const createOrFindRecepient = (req,res) =>
{

    return new Promise( (resolve, reject) => {
        let userEmail = req.user.doc.email; 
        recepientModel.findOne({toEmail:req.body.toEmail || 'akshayrangasai.d@gmail.com'})
        .then(
            (recepientData,err) => {
                
                if(!recepientData)
                {
                    findUser( userEmail ).then
                    ((user) => {
                        const recepientData = 
                            {
                                fromUser : user._id,
                                /*Pass user id for match - can autopopulate with session data*/
                                toEmail : req.body.toEmail || "akshayrangasai.d@gmail.com",
                                toPhone : req.body.toPhone || null,
                                toName : req.body.toName || "Akshay Rangasai",
                                toDetails : req.body.toDetails  
                            };

                        console.log(recepientData);
                        recepientModel.create(recepientData)
                        .then
                        (
                            (data,err) => resolve(data)
                        )
                        .catch
                        (
                            (err) => reject(err)
                        )
                    });
                }
                else
                {
                    resolve(recepientData)
                }
            }
        )
        .catch
        (
            (err) => reject(err)
        );
        
    });  
};



module.exports = {createOrFindRecepient, findAllRecepients, findRecepientById};

//mongodb+srv://dumblord@0V2vgSVGC6NkvUUTcluster0.xzyu0mk.mongodb.net/Holiday_szn