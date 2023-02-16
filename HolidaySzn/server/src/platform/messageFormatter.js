require('dotenv').config();
const ejs = require('ejs');
var fs = require('fs');

class messageFormatter{

    constructor(channel, wrapper){

        /*
        Wrapper tells me if I should get the entire HTML file before and after. 
        We will create a template function and inject this message if wrapper is true, else we just send formatted message
        */
        this.channel = "email" || channel;
        this.wrapper = true || wrapper;
    }

    async errorFormat(err, channel = this.channel, wrapper = this.wrapper){

        /*
        Make changes based on channel as we add more channels
        Currently, we assume we send notifications via send grid, and thus output will be an HTML
        */

        err = err.replace(/(?:\r\n|\r|\n)/g, '<br>');
        const finalMessage = wrapper? await this.wrappedMessage(greeting, "error"):greeting;
        return finalMessage;
        

    }

    async greetingsFormat(greeting)
    {
        greeting = greeting.replace(/(?:\r\n|\r|\n)/g, '<br>');
        const finalMessage = wrapper? await this.wrappedMessage(greeting, "greeting"):greeting;
        return finalMessage;
    }

    async wrappedMessage(message, msgtype)
    {
        if(msgtype = "error")
        {


        }
        else
        {
            let htmlContent = fs.readFileSync(__dirname,+'/templates/greeting.ejs','utf8');
            let htmlRendered = ejs.render(htmlContent, {greeting : message, greetingsurl : process.env.CLIENT_URL});
            return htmlRendered;   
        }

    }
}