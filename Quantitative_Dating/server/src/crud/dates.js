const dateModel = require("../models/date");
const matchModel = require("../models/match");

const getAllDates = (req,res) =>
{
    /* 
    //Once we figure out auth can do this
    
    const user = req.body.user;
    
    */
    dateModel.find(/*{matchUser : user}*/)
    .then
    (
        (data,err) => res.json(data) 
    )
    .catch
    (
        (err) => console.log(err)
    );
    
};

/* Have to pass Match ID from the dropdown list. Need to validate if match id exists, else we rekt */
const newDate = (req,res) =>
{

    const matchID = req.body.matchID || "63aa1903ea95f8f7e28656ff";
    matchModel.findOne({_id : matchID})
    .then
    (
        (matchData, err) =>
            {
                
                console.log(matchData)
                const dateDetails = 
                {
                    dateMatch : matchData._id,
                    dateDate : new Date()
                };
                dateModel.create(dateDetails)
                .then
                (
                    (data, err) => res.json(data)
                )
                .catch
                (
                    (err) => console.log(err)
                )
            }
    )
    .catch
    (
        (err) => console.log(err)
    )

    //res.send('Great Job')
    
};






module.exports = {getAllDates, newDate};