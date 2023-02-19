require('dotenv').config();
const ejs = require('ejs');
var fs = require('fs');
const path = require('path');


    async function errorFormat(err, channel = "email", wrapper = true){

        /*
        Make changes based on channel as we add more channels
        Currently, we assume we send notifications via send grid, and thus output will be an HTML
        */

        err = err.replace(/(?:\r\n|\r|\n)/g, '<br>');
        const finalMessage = wrapper? await wrappedMessage(greeting, "error"):greeting;
        return finalMessage;
        

    }

    async function greetingsFormat(greeting)
    {
        

        //console.log(typeof(greeting))
        greeting = greeting.replace(/(?:\r\n|\r|\n)/g, "<br>");
        //console.log(greeting)
        const finalMessage = await wrappedMessage(greeting, "greeting");

        return new Promise((resolve, reject) =>
        {
            //console.log("greetings Format", greeting);
            resolve(finalMessage)
        })
        /*
        
        
        return finalMessage;
        */
    }

    async function wrappedMessage(message, msgtype)
    {
        //console.log("wrapping",  msgtype)
        return new Promise((resolve, reject)=>{
        if(msgtype == "error")
        {
            //console.log(__dirname,+'/templates/error.ejs');
            let htmlContent = fs.readFileSync(__dirname,+'/templates/error.ejs','utf8');
            let htmlRendered = ejs.render(htmlContent, {greeting : message, greetingsurl : process.env.CLIENT_URL});
            resolve(htmlRendered);   

        }
        else
        {
            const filePath = path.join(process.cwd(), '/src/templates/greeting.ejs');
            //console.log(filePath);
            let htmlContent = fs.readFileSync(filePath,'utf8');
            let htmlRendered = ejs.render(htmlContent, {greeting : message, greetingsurl : process.env.CLIENT_URL});
            resolve(htmlRendered);   
        
        }
    })
    }


module.exports = {greetingsFormat}