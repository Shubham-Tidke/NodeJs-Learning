const mongoose = require('mongoose');
const validator = require('validator');
const becrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//storing object in userSchema before creating mongoose model to hash the password and store it securely
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //validating the complusion of field
        trim: true  //to remove end spaces
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Invalid age privided : ' + value);
            }
        }
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('weak password : length less than 6')
            }
            if (value.includes('password')) {
                throw new Error('password string not allowed')
            }
        }
    },
    //storing tokens so that user can login with other devices as well
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//function to generate auth token for specific user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'new token')//passing unique user id and secretOrPrivateKey
    //saving generated tokens   
    user.tokens = user.tokens.concat({ token })
    await user.save();
    return token;
}

//function to verify login credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    //check for email match
    if (!user) {
        throw new Error('Unable to login!!')
    }
    //check for hashed pwd if email provided is found
    const isMatch = await becrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login!');
    }
    return user;
}


//performing hashing before saving user [function passed here need to be standard one as bnding is important here]
userSchema.pre('save', async function (next) {
    const user = this;
    //hash the password,if user has modified the password in update query
    if (user.isModified('password')) {
        user.password = await becrypt.hash(user.password, 8)
    }
    next();//need to call this when done
})

//defining  model(name-of-model,defination) 
const User = mongoose.model('User', userSchema)


module.exports = User;