const mongoose = require('mongoose');

//mongoose.conncect('url/database-name')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})
