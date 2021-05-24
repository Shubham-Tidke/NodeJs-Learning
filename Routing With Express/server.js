const express = require('express')
const helmet = require('helmet') // helps securing express app

const app = express();//creates an express application
app.use(helmet());
//respond with "hello" when a GET request is made to the homepage
app.post('/', (req, res) => {
    res.send("hello from POST")
});
app.get('/', (req, res) => {
    res.send("hello from get request")
});
//Use the express.Router class to create modular, mountable route handlers.
// A Router instance is a complete middleware and routing system;
var router = express.Router();
router.get('/birds', (req, res) => {
    res.send("from router");
});
app.use(router);
app.listen(8080);