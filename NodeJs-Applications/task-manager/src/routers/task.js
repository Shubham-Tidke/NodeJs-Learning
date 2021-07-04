const express = require('express')
const Tasks = require('../models/task')
const auth = require("../middleware/auth");
const { request } = require('express');
const router = new express.Router();


//creating tasks [async-await]
router.post('/tasks', auth, async (req, res) => {
    const task = new Tasks({
        ...req.body,//spread operator to copy all tasks provided
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})

//fetching tasks [async-await]
router.get('/tasks', auth, async (req, res) => {
    try {
        //fetching only those tasks which are related to user's id
        const tasks = await Tasks.find({ owner: req.user._id });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

//fetching single tasks
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        //fetching only those tasks which are related to user's id
        const task = await Tasks.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})
//upating tasks
router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['completed', 'description'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send('Invalid task property provided')
    }
    try {
        //findByIdAndUpdate passes middleware logics which stores password securely
        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })

        //const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})
//Delete Task
router.delete('/tasks/:id', auth, async (req, res) => {
    const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    try {
        if (!task)
            return res.status(404).send('Task Not Found!!');
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;