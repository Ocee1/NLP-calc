const express = require('express');
require('dotenv').config();

const cors = require('cors');





const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/', async (req, res) => {
    const y = req.body.y;
    const x = req.body.x;
    let opstring = req.body.operation_type;
    if (opstring == 'addition' || opstring == 'add' || opstring == '+' || opstring.includes('addition') || opstring.includes('add')) {
        let result = x + y;
        res.json({
            "slackUsername": "Jake",
            "result": result,
            "operation_type": "addition"
        });
    }
    else if (opstring == 'subtraction' || opstring == 'minus' || opstring == '-' || opstring.includes('minus') || opstring.includes('subtraction') || opstring.includes('difference')) {
        let result = x - y;
        res.json({
            "slackUsername": "Jake",
            "result": result,
            "operation_type": "subtraction"
        });
    }
    else if (opstring == '*' || opstring == 'multiplication' || opstring == 'multiply' || opstring.includes('divide') || opstring.includes('division')) {
        let result = x * y;
        res.json({
            "slackUsername": "Jake",
            "result": result,
            "operation_type": "multiplication"
        });
    } else {
        res.json({msg: "invalid operation"})
    }
}).listen(PORT, () => console.log('Server is listening on port: ', PORT));