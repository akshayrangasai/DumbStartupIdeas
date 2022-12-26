const matchModel = require("../models/match");
const userModel = require("../models/user");

const getAllMatches = (req,res) =>
{
    /* 
    //Once we figure out auth can do this
    
    const user = req.body.user;
    
    */
    matchModel.find(/*{matchUser : user}*/)
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

    userModel.findOne({username:req.body.user || 'akshayrangasai'})
    .then(
           (userData,err) => {
            
            const userid = userData._id;
            const matchData = 
                {
                matchUser: userid,
                matchName : req.body.matchName || 'Aditya K Anguria',
                matchDate: req.body.matchDate || '11/26/1992',
                matchSource : req.body.matchSource || 'Bumble',
                matchSourceDetails : req.body.matchSourceDetails || 'Bumble BFF',
                matchNotes: req.body.matchNotes || 'Hottie',
                };

            console.log(matchData);
            matchModel.create(matchData)
            .then
            (
                (data,err) => res.json(data) 
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
    );
    
    
};


/* Separate End Point to Creat a list that we can hit for our date API*/
const allMatchNames = (req,res) =>
{

    userModel.findOne({username:req.body.user || 'akshayrangasai'})
    .then
    (
        (userData, err) => 
        {
            const query = 
            {
                matchUser : userData._id
            };
            console.log(query);
            matchModel.find(query, "_id matchName")
            .then
            (
                (data,err) => res.json(data) 
            )
            .catch
            (
                (err) => console.log(err)
            );

        }
    )
    .catch
    (
        (err) => console.log(err)
    )
    
};



module.exports = {getAllMatches, newMatch, allMatchNames};