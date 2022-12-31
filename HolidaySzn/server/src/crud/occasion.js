const occasionModel = require("../models/occasion");
//const userModel = require("../models/user");
import { findUser } from "./user";
import {createOrFindRecepient} from "./recepient";
import {insertMessage} from '../platform/crudToMessage';

const newOccasion = (req,res) =>
{

    createOrFindRecepient(req,res)
    .then(
           (recepientData,err) => {
            findUser(req.user.doc.email).then(
                
                (userData) =>{
                const recepientid = recepientData._id;
                const occasionData = 
                    {
                        fromUser: userData._id,
                        recepientDetails : recepientid,
                        occasionDate: req.body.occasionDate || new Date(),
                        occasionDetails: req.body.occasionDetails || null, 
                        occasionName : req.body.occasionName || "Birthday",
                        createdAt : new Date()
                    };

                console.log(occasionData);
                occasionModel.create(occasionData)
                .then
                (
                    (data,err) => {
                        //Send to message builder and build message from it in the platform
                        insertMessage(data);
                        res.json(data);
                    } 
                )
                .catch
                (
                    (err) => console.log(err)
                )
            })
        }
    )
    .catch
    (
        (err) => console.log(err)
    );
    
    
};



module.exports = {newOccasion};