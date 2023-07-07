const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const checkLogin = require('../middlewares/checkLogin');

const router = express.Router();
const Todo = new mongoose.model('Todo', todoSchema);
// want to protect this route
router.get('/', checkLogin, async (req, res) => {
    const result = await Todo.find({});
    console.log(result);
});

// // Get all todos
// router.get('/', async (req, res) => {
//     const result = await Todo.find({});
//     console.log(result);
// });

// get the customize todo with async await

router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    });
});

// get the customize todo with callback

router.get('/active-callback', (req, res) => {
    const todo = new Todo();
    todo.findActiveCallback((err, data) => {
        res.status(200).json({
            data,
        });
    });
});
// static methods
router.get('/js', async (req, res) => {
    const data = Todo.findByJS();
    res.status(200).json({
        data,
    });
});

// Query Helper
router.get('/language', async (req, res) => {
    const data = await Todo.find().byLanguage('reactJS'); // here .bylanguage is a queryHelper
    res.status(200).json({
        data,
    });
});

// Get a TODO by ID
router.get('/:id', async (req, res) => {});

// POST TODO
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save().then((docs) => {
        if (docs) {
            res.status(200).json({
                message: 'TODO was inserted successfully',
            });
        } else {
            res.status(500).json({
                error: 'There is a server side error.',
            });
        }
    });
});
// POST Multiple TODO
router.post(
    '/all',
    async (req, res) => await Todo.insertMany(req.body).then((docs) => {
            if (docs) {
                res.status(200).json({
                    message: 'TODO was inserted successfully',
                });
            } else {
                res.status(500).json({
                    error: 'There is a server side error.',
                });
            }
        }),
);

// PUT TODO
router.put('/:id', async (req, res) => {
    await Todo.updateOne({ _id: req.params.id }, { $set: { status: 'inactive' } }).then((docs) => {
        if (docs) {
            res.status(200).json({
                message: 'TODO was updated successfully',
            });
        } else {
            res.status(500).json({
                error: 'There is a server side error.',
            });
        }
    });
});

// DELETE TODO

router.delete('/:id', async (req, res) => {});
module.exports = router;
