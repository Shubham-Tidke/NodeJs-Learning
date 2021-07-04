const jwt = require('jsonwebtoken')
const User = require('../models/user')
//setting up middleware to add authentication[check for valid JWT]
const auth = async (req, res, next) => {
    try {
        //getting the auth token and removing bearer from it to validate
        const token = req.header('Authorization').replace('Bearer ', '');
        //verifying the provided token using the private key used to sign token
        const decoded = jwt.verify(token, 'new token')
        //finding the user with _id in decoded and checking if the token exists
        //[if user logs out,token gets delete] under that id
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token;//adding token so that it can be accessed by route handlers for further operations[CRUD tasks,logout]
        req.user = user; //adding user to request so that it can be accessed by route handlers
        next();
    } catch (error) {
        res.status(401).send({ error: "authentication failed!" })
    }
}

module.exports = auth;