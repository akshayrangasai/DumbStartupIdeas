const occasionModel = require("../models/occasion");
const messageModel = require('../models/messages')
const recepientModel = require('../models/recepient')
const messageBuilderModel = require('../models/messageBuilder');
const finalEmailModel = require('../models/finalEmail');
//const userModel = require("../models/user");
import { findUser } from "./user";
const { extractOccasionDetailsFromText } = require('../platform/occasionExtractor');
import {createOrFindRecepient} from "./recepient";
import {insertMessage} from '../platform/crudToMessage';
import {findRecepientById} from './recepient';

const newOccasionFromText = async (req, res) => {
    try {
        const text = req.body.text;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const extractedData = await extractOccasionDetailsFromText(text);

        // Merge extracted data into req.body
        req.body = { ...req.body, ...extractedData };

        // Call the existing newOccasion function
        newOccasion(req, res);

    } catch (err) {
        console.error("Error processing text occasion:", err);
        res.status(500).json({ error: "Failed to process text description" });
    }
};

const newOccasion = (req,res) =>
{

    createOrFindRecepient(req,res)
    .then(
           (recepientData,err) => {
            findUser(req.user.email).then(

                (userData) =>{

                //console.log(req.body);

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

                //console.log(occasionData);
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


const deleteOccasion = (req,res)=>
{
    //console.log(req.params.id)
    const _id = req.params.id;

    messageModel.deleteOne({occasionId:_id}).then(
        (data) => {/*console.log('one delete in');*/messageBuilderModel.deleteOne({occasionId:_id}).then(
            (data_2) => occasionModel.deleteOne({_id : _id}).then(
                (resdata) => res.json(resdata)
            )
        )}
    ).catch(
        (err) => res.send(err)
    )


}

const allOccasions = async (req,res) =>
{
    let userEmail = req.user.email;
    const user = await findUser( userEmail );
    const occasionData = {fromUser : user._id}
    const data = await occasionModel.find(occasionData).sort({occasionDate: 1});
    const allOccasions = await Promise.all(data.map(async (occasionArray) =>
                            {
                                return new Promise(
                                    (resolve, reject) => findRecepientById(occasionArray.recepientDetails).then((recepientData) =>
                                    {

                                        const returnDict = {
                                            toName : recepientData.toName,
                                            toEmail: recepientData.toEmail,
                                            toDetails: recepientData.toDetails,
                                            occasionName: occasionArray.occasionName,
                                            occasionDetails: occasionArray.occasionDetails,
                                            occasionDate: occasionArray.occasionDate,
                                            occasionId: occasionArray._id
                                        };
                                        //console.log(returnDict);
                                        resolve(returnDict);

                                    }))
                            }));
    //console.log(allOccasions)

    res.json(allOccasions);
}


const sentOccasions = async (req,res) =>
{
    //console.log('sent occasions');
    let userEmail = req.user.email;
    const user = await findUser( userEmail );
    const occasionData = {fromUser : user._id}
    const data = await finalEmailModel.find(occasionData)
    //console.log(data);
    const allOccasions = data.map((occasionArray) =>
                            {
                                        const returnDict = {
                                            toName : occasionArray.toName || null,
                                            toEmail: occasionArray.toEmail || null,
                                            emailDate : occasionArray.emailDate,
                                            emailSubject: occasionArray.emailSubject,
                                            emailContent: occasionArray.emailBody,
                                            autoSend : occasionArray.autoSend
                                        };
                                        //console.log(returnDict);
                                        return returnDict;
                                    }



    );
    //console.log(allOccasions)

    res.json(allOccasions);
}

const getMessageForOccasion = (req,res) =>
{
    //console.log(req.params.id)
    const _id = req.params.id;

    messageModel.findOne({occasionId:_id}).then(
        (data) => res.send(data.formattedMessage)

            ).catch(
        (err) => res.send(err)
    )


    //res.json(allOccasions);
}
module.exports = {newOccasion, newOccasionFromText, allOccasions, deleteOccasion, sentOccasions, getMessageForOccasion};
