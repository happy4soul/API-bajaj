

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());


app.get('/', (req, res) => {
    const __dirname = path.resolve(path.dirname(''));
    res.sendFile(path.join(__dirname, 'index.html')); // Replace 'index.html' with your HTML file name
});

// GET endpoint
app.get('/api/getEndpoint', (req, res) => {
    
    const operation_code = 1;
    res.status(200).json({ operation_code });
});

// POST endpoint
app.post('/api/postEndpoint', (req, res) => {
    
    const { user_id, email, roll_number, numbers, alphabets } = req.body;

    
    const highest_alphabet = findHighestAlphabet(alphabets);

    
    const response = {
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet: [highest_alphabet],
    };

    res.json(response);
});


function findHighestAlphabet(alphabets) {
    return alphabets.reduce((highest, current) => {
        return current > highest ? current : highest;
    }, 'A');
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});