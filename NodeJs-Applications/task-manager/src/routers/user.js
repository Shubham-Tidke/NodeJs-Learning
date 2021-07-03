const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router();


//adding users [async-await ]
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();//generating token when user signin
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
})

//user login route
router.post('/users/login', async (req, res) => {
    try {
        //calling reusable function findByCredentials[models/user.js]using mongoose model to verify provided creds
        const user = await User.findByCredentials(req.body.email, req.body.password)
        //creating token for user
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
})
//fetchig user profile [async-await]
//passing auth middleware before executing the route 
router.get('/users/me', auth, async (req, res) => {
    //function will execute ony when auth gets successful,
    //if it is successful,just get the user  
    res.send(req.user);
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
        //findByIdAndUpdate passes middleware logics which stores password securely
        const user = await User.findById(req.params.id);
        updates.forEach((update) => {
            user[update] = req.body[update];
        })
        await user.save();
        //   const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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