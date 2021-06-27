const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/task');
const { request } = require('express');
const app = express();
const port = process.env.port || 3000

app.use(express.json()) //Returns middleware that only parses json due to which incoming data is accesible

//adding users
app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(400).send(error);

    })
})
//fetchig all users
app.get('/users', (req, res) => {
    User.find({}).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})
//fetching single user
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {       //valid objectID check
        User.findById(_id).then((result) => {
            res.send(result);
        }).then((error) => {
            res.status(500).send();
        })
    }
    else
        return res.status(404).send("User not found")
})

//creating tasks
app.post('/tasks', (req, res) => {
    const task = new Tasks(req.body);
    task.save().then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    })
})
//fetching tasks
app.get('/tasks', (req, res) => {
    Tasks.find({}).then((result) => {
        res.send(result);
    }).then((error) => {
        res.status(500).send(error);
    })
})

//fetching single tasks
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        Tasks.findById(_id).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(500).send(error);
        })
    } else
        res.status(404).send("Task not found!")
})

app.listen(port, () => {
    console.log("server is up: " + port);
})