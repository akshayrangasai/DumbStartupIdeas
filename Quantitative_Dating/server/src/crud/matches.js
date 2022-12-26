import {matchModel} from "../models/match";

const getAllMatches = (req,res) =>
{
    /* 
    //Once we figure out auth can do this
    
    const user = req.body.user;
    
    */
    matchModel.findAll(/*{matchUser : user}*/)
    .then
    (
        (data,err) => res.json(data) 
    )
    .catch
    (
        (err) => console.log(err)
    );
    
};


const newMatch = (req,res) =>
{

    const matchData = {
        matchUser: req.body.user || 'akshay@sigmacomputing.com',
        matchName : req.body.matchName,
        matchDate: req.body.matchDate,
        matchSource : req.body.matchSource,
        matchSourceDetails : req.body.matchSourceDetails,
        matchNotes: req.body.matchNotes,
    };

    matchModel.insertOne(matchData)
    .then
    (
        (data,err) => res.json(data) 
    )
    .catch
    (
        (err) => console.log(err)
    );
    
};


module.exports = {getAllMatches, newMatch};