const express = require('express')
const User = require('../models/user')
const router = new express.Router();



//adding users [async-await ]
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

//fetchig all users [async-await]
router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);

    } catch (error) {
        res.status(500).send(error);
    }
})

//fetching single user [async-await]
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        if (_id.match(/^[0-9a-fA-F]{24}$/)) {
            const user = await User.findById(_id);
            res.send(user);
        }
        else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send();
    }
})

//updating users [async-await]
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    //checks for unknown property
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update) //returns false if any of provided property is not from allowedUpdates
    )
    if (!isValidOperation) {
        return res.status(400).send('Invalid Property provided!')
    }
    try {
        //updates will be received through http request[req.body]
        //runValidator validates newly provided updates
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error); //handling only validation error
    }
})

//Delete User
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send('User Not Found!');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;