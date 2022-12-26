const userModel = require("../models/user");

const newUser = (req,res) =>
{

    const userData = {
        username: req.body.username || 'akshayrangasai',
        password : req.body.password || 'akshayrangasai',
        email: req.body.email || 'test@dumbstartupideas.com',
        createdAt : new Date()
    };

    console.log(userData);
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





module.exports = {newUser};