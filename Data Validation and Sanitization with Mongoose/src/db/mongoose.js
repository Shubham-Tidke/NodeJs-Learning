const mongoose = require('mongoose');
const validator = require('validator');

//mongoose.conncect('url/database-name')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// VALIDATION using mongoose

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
            if (value < 0)
                throw new Error('Invalid age privided : ' + value);
        }
    },
    email: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid Email')
        }
    },
    password: {
        type: String,
        trim: true,
        validate(value) {
            if (value.length < 6)
                throw new Error('weak password : length less than 6')
            if (value.includes('password'))
                throw new Error('password string not allowed')
        }
    }
})

//creating instance of the model

const me = new User({ name: '  Abhilash ', age: 24, email: 'abc@gmail.com  ', password: '  dsghghsak ' })
//saving instance to database
//monsoose create collection by his own to save the instance using plularazation
me.save().then((res) => { //save()return a promise
    console.log(res);
}).catch((error) => {
    console.log(error);
})

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Tasks({ description: ' new description-2 ', completed: true })
task.save().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err.message);
})