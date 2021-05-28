const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use((req, res, next) => {
    console.log("Request made on: ", Date.now());
    next();
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/assets', (req, res, next) => {
    console.log("serving assets!");
    next();
}, express.static('assets'));
app.listen(8080);