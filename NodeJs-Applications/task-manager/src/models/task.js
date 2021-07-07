const mongoose = require('mongoose');
const validator = require('validator');

const TaskSchema = new mongoose.Schema({
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
}, {
    timestamps: true
})
//defining  model(name-of-model,defination) 
const Tasks = mongoose.model('Tasks', TaskSchema)

module.exports = Tasks;