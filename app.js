const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

const app = express();
dotenv.config();

app.use(express.json());
// Database Connection With Mongoose.
mongoose
    .connect('mongodb://localhost:27017/todos', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    })
    .then(() => {
        console.log('Database successfully connected.');
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send('Hello World');
});
// to-do handler
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handling.

function errorHandler(err, req, res, next) {
    if (res.headerSent()) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.listen(3000, () => {
    console.log('The server has started on port 3000.');
});
