const express = require('express')
const Tasks = require('../models/task')
const router = new express.Router();


//creating tasks [async-await]
router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);
    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})

//fetching tasks [async-await]
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

//fetching single tasks
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        if (_id.match(/^[0-9a-fA-F]{24}$/)) {
            const task = await Tasks.findById(_id);
            res.send(task);
        }
        else
            res.status(404).send("Task not found!")
    } catch (error) {
        res.status(500).send(error);
    }
})
//upating tasks
router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['completed', 'description'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send('Invalid task property provided')
    }
    try {
        //findByIdAndUpdate passes middleware logics which stores password securely
        const task = await Tasks.findById(req.params.id)
        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save();
        //const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})
//Delete Task
router.delete('/tasks/:id', async (req, res) => {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    try {
        if (!task)
            return res.status(404).send('Task Not Found!!');
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;