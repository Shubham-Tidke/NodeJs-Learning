const express = require('express')
require('./db/mongoose')
//const User = require('./models/user')
//const Tasks = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.port || 3000

app.use(express.json()) //Returns middleware that only parses json due to which incoming data is accesible
app.use(userRouter)//registering router for user
app.use(taskRouter)//registering router for task

app.listen(port, () => {
    console.log("server is up: " + port);
})


 