

function emailDispatch(req,res){

    console.log("Dispatch Called")

}

function emailDispatchTest(req,res){

    console.log("Dispatch Called", req.body)

}

module.exports = {emailDispatch, emailDispatchTest}