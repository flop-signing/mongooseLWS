const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // mandatory field return false if user try to get empty value.
    },
    username: {
        type: String,
        required: true, // mandatory field return false if user try to get empty value.
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
});

module.exports = userSchema;
