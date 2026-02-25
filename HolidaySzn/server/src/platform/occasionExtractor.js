require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

async function extractOccasionDetailsFromText(text) {
    const configuration = new Configuration({
        organization: process.env.OPENAI_ORG,
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const today = new Date().toISOString().split('T')[0];

    const prompt = `Extract the following details from the text into a JSON object:
- toName (Recipient Name)
- toEmail (Email Address)
- toDetails (Adjectives to describe recipient)
- occasionName (What kind of event)
- occasionDate (Date in YYYY-MM-DD format. Today is ${today})
- occasionDetails (Event Description)

If a field is missing or not applicable, use null.

Text: "${text}"`;

    return new Promise((resolve, reject) => {
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
            temperature: 0.2, // Lower temperature for more deterministic output
            max_tokens: 500,
        }).then((response) => {
            const content = response.data.choices[0].message.content;
            try {
                // Find JSON block if wrapped in markdown or just plain text
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                const jsonString = jsonMatch ? jsonMatch[0] : content;
                const data = JSON.parse(jsonString);
                resolve(data);
            } catch (e) {
                console.error("Failed to parse JSON from OpenAI response:", content);
                reject(e);
            }
        }).catch(err => {
            console.error("OpenAI API Error:", err);
            reject(err);
        });
    });
}

module.exports = { extractOccasionDetailsFromText };
