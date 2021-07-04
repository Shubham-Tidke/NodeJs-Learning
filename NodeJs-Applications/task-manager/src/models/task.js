const mongoose = require('mongoose');
const validator = require('validator');

//defining  model(name-of-model,defination) 
const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        //storing id of user who created task
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //reference to the User model to link two models together[supported by mongoose]
    }
})

module.exports = Tasks;