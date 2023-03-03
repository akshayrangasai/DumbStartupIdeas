require('dotenv').config();
import { Configuration, OpenAIApi } from "openai";

/* Keeping the openAI configuration for completion hardcoded right now, can move it to a class later, but right now this works*/


async function getPoemFromPrompt(prompt)
{
    
    const configuration = new Configuration({
        organization: process.env.OPENAI_ORG,
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    const openai = new OpenAIApi(configuration);
    
    return new Promise((resolve,reject) =>
    {
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [{"role" : "user", "content" : prompt}],
            temperature: 0.7,
            max_tokens: 1600,
            top_p: 1.0,
            frequency_penalty: 0.4,
            presence_penalty: 0.0,
        }).then((response) => {/*console.log(response.data.choices[0].text);*/resolve(response.data.choices[0].message.content)}).catch(err => console.log(err));
    })
    

}
module.exports = {getPoemFromPrompt}