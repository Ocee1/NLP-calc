const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');





const PORT = process.env.PORT || 3000;

const app = express();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/', async (req, res) => {
    
    const { operation_type, x, y } = req.body;
    if (operation_type == 'addition' || operation_type == 'add' || operation_type == '+') {
        let result = x + y;
        res.json({
            "slackUsername": "Jake",
            "result": result,
            "operation_type": "addition"
        });
    }
    else if (operation_type == 'subtraction' || operation_type == 'minus' || operation_type == '-') {
        let result = x - y;
        res.json({
            "slackUsername": "Jake",
            "result": result,
            "operation_type": "subtraction"
        });
    }
    else if (operation_type == '*' || operation_type == 'multiplication' || operation_type == 'multiply') {
        let result = x * y;
        res.json({
            "slackUsername": "Jake",
            "result": result,
            "operation_type": "multiplication"
        });
    } else {
        let operation;
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: operation_type,
            temperature: 0,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0.0,
            stop: ["\n"],
        });
        let result = response;
        let opstr = toString(response);
        if (opstr.includes('+')) {
            operation = '+';
        } else if (opstr.includes('*')) {
            operation = '*';
        }else if (opstr.includes('-')) {
            operation = '-';
        } else {
            operation = opstr;
        }
        res.json({
            "slackUsername": "Jake",
            "result": result,
            "operation_type": operation
        });
    }
}).listen(PORT, () => console.log('Server is listening on port: ', PORT));