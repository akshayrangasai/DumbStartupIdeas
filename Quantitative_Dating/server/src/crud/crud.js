const matchModel = require("../../models/match");

const getAllMatches = (req,res) =>
{
    const user = req.body.user;
    const matches = matchModel.findAll({matchUser : user});
    res.json(matches);
};

module.exports = {getAllMatches};