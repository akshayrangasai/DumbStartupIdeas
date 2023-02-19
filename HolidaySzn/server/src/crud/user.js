const userModel = require("../models/user");

const newUser = (req,res) =>
{

    const userData = {
        name: req.body.name || 'Akshay',
        password : req.body.password || 'akshayrangasai',
        email: req.body.email || 'test@dumbstartupideas.com',
        createdAt : new Date()
    };

    //console.log(userData);
    userModel.create(userData)
    .then
    (
        (data,err) => res.json(data) 
    )
    .catch
    (
        (err) => console.log(err)
    );
    
};


const findUser = (email) =>
{
    return new Promise((resolve,reject) => 
    {
        const userData = {
            email: email || 'test@dumbstartupideas.com',
        };

        //console.log(userData);
        userModel.findOne(userData)
        .then
        (
            (data,err) => resolve(data)
        )
        .catch
        (
            (err) => {
                console.log(err)
                reject(err);
            }
        );
    })
    
};

const findUserById = (Id) =>
{
    return new Promise((resolve,reject) => 
    {
        const userData = {
            _id: Id,
        };

        //console.log(userData);
        userModel.findOne(userData)
        .then
        (
            (data,err) => resolve(data)
        )
        .catch
        (
            (err) => {
                console.log(err)
                reject(err);
            }
        );
    })
    
};


module.exports = {newUser, findUser, findUserById};