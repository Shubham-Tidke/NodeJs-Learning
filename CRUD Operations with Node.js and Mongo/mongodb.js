//CRUD operations
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient //allows access to necessary functions to connect to database
const connectionURL = 'mongodb://127.0.0.1:27017';//localhost
const databaseName = 'task-manger';
const ObjectID = mongodb.ObjectID;

// const id = new ObjectID;
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('error occured!');
    }
    const db = client.db(databaseName) //gives a database reference for the database name
    //CREATE

    //creates collection'users' with one document insert
    db.collection('users').insertOne({
        name: 'Shubham',
        age: 24
    }, (error, result) => {
        if (error)
            return console.log('failed to add!');
        console.log(result.ops);//result.ops gets an array of inserted documents
    })

    db.collection('users').insertMany([ //insertMany adds array of documents
        {
            name: 'Kiran',
            age: 24
        },
        {
            name: 'Subodh',
            age: 27
        }], (error, result) => {
            if (error)
                return console.log('failed to connect!!');
            console.log(result.ops);
        })
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

    //READ 

    db.collection('users').findOne({ name: 'shubham' }, (error, response) => {
        if (error)
            return console.log("Fetching failed!!");
        console.log(response);
    })
    db.collection('users').find({ name: 'shubham' }).toArray((err, res) => {
        if (err)
            return console.log(err);
        console.log(res);
    })

    //UPDATE

    //updateOne returns promise

    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("60d5e67afefbd60a105ae1bd")
    }, {
        $set: {
            name: 'Updated-ID'
        }
    })
    updatePromise.then((result) => {
        console.log(result.matchedCount);
        console.log(result.modifiedCount);
    }).catch((error) => {
        console.log(error);
    })

    //updateMany returns promise
    const updateMany = db.collection('tasks').updateMany({
        isComplete: true
    }, {
        $set: {
            isComplete: false
        }
    })
    updateMany.then((result) => {
        console.log(result.modifiedCount);
    }).catch((error) => {
        console.log(error);
    })

    //Delete

    //deleteMany,returns prmoise
    db.collection('users').deleteMany({
        age: 24
    }).then((result) => {
        console.log(result.deletedCount);
    }).catch((error) => {
        console.log(error);
    })

    //deleteOne
    db.collection('tasks').deleteOne({
        descreption: 'desc-1'
    }).then((result) => {
        console.log(result.deletedCount);
    }).catch((error) => {
        console.log(error);
    })

})