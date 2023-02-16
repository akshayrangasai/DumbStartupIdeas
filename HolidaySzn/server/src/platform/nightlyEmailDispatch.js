import messagModel from '../models/messages'

function emailDispatch(req,res){

    console.log("Dispatch Called")

}

function emailDispatchTest(req,res){

    console.log("Dispatch Called", req.body)
    res.send(req.body)

}

module.exports = {emailDispatch, emailDispatchTest}