// REST API V 1.0.0 
// Comic List
// Created : 31 December 2021
// Updated : 31 December 2021

const express = require('express');
const app = express();

//routes
app.get('/testing', (req, res) => {
    res.send('REST API')
})

const port = 8000

app.listen(port, console.log(`Server is listening on port ${port}...`));