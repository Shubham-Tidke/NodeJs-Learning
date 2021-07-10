const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')//to support file upload
const sharp = require('sharp');//to resize/format the image
const router = new express.Router();

//signup users [async-await ]
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

//user logout route[deleting the authentication token user used to login]
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tok) => {
            return tok.token !== req.token
            //if tok.token !== req.token gives false[token used for login isfound], it will be filtered
        })
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send();
    }
})
//logout all sessions[deleting all tokes]
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        //deleting all active session tokens
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
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
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         if (_id.match(/^[0-9a-fA-F]{24}$/)) {
//             const user = await User.findById(_id);
//             res.send(user);
//         }
//         else {
//             return res.status(404).send("User not found");
//         }
//     } catch (error) {
//         res.status(500).send();
//     }
// })

//updating users [async-await]
router.patch('/users/me', auth, async (req, res) => {
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
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error); //handling only validation error
    }
})

//Delete User
router.delete('/users/me', auth, async (req, res) => {
    try {
        //req object has user attched to it[in auth.js],using req.user current logged user is accessed
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
})
//uploading profile pictures for users

const upload = multer({
    //dest: 'avatar', //destination folder name
    limits: {
        fileSize: 1000000 //filesize limit to 1mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)/))
            return cb(new Error('file format invalid'))
        cb(undefined, true);
    }

})
//upload profile image
router.post('/users/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer) //req.file.buffer will be the image for user
        .resize({ width: 250, height: 250 })//resizing using sharp
        .png()//converting the image to png
        .toBuffer();//geeting the image back in form of buffer
    req.user.avatar = buffer //storing processed buffer
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
//delete profile image
router.delete('/users/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
})
//get profile image
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
})
module.exports = router;