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
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.4,
            max_tokens: 1500,
            top_p: 1.0,
            frequency_penalty: 0.4,
            presence_penalty: 0.0,
        }).then((response) => {/*console.log(response.data.choices[0].text);*/resolve(response.data.choices[0].text)})
    })
    

}
module.exports = {getPoemFromPrompt}