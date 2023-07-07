const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('./schemas/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);

router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({ data });
});
