import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

const app = express();

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    organization: "Enter your organisation id from Open AI",
    apiKey: "Put your API key"
});
const openai = new OpenAIApi(configuration);



app.listen("3001", () => console.log("Listening on port 3001"));

app.get("/", (req,res) => {
    res.send("Hello");
})

app.post('/', async (req,res) => {

    const {message} = req.body;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.4
        });
        res.json({message: response.data.choices[0].text})
        
    } catch (e) {
        console.log(e);
        res.send(e).status(400);
        
    }

})
