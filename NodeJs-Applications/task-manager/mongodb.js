//CRUD operations
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient //allows access to necessary functions to connect to database
const connectionURL = 'mongodb://127.0.0.1:27017';//localhost
const databaseName = 'task-manger';
const objectID = mongodb.ObjectID;

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('error occured!');
    }
    const db = client.db(databaseName) //gives a database reference for the database name
    //CREATE
    //creates collection'users' with one document insert
    // db.collection('users').insertOne({
    //     name: 'Shubham',
    //     age: 24
    // }, (error, result) => {
    //     if (error)
    //         return console.log('failed to add!');
    //     console.log(result.ops);//result.ops gets an array of inserted documents
    // })
    // db.collection('users').insertMany([ //insertMany adds array of documents
    //     {
    //         name: 'Kiran',
    //         age: 24
    //     },
    //     {
    //         name: 'Subodh',
    //         age: 27
    //     }], (error, result) => {
    //         if (error)
    //             return console.log('failed to connect!!');
    //         console.log(result.ops);
    //     })
    db.collection('tasks').insertMany([
        {
            descreption: 'desc-1',
            isComplete: true
        },
        {
            descreption: 'desc-2',
            isComplete: false
        },
        {
            descreption: 'desc-3',
            isComplete: true
        }], (error, result) => {
            if (error)
                return console.log('failed to add!!');
            console.log(result.ops);
        })
})