const mongoose = require('mongoose');
const validator = require('validator');

//defining  model(name-of-model,defination) 
const User = mongoose.model('User', {
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
    }
})


module.exports = User;