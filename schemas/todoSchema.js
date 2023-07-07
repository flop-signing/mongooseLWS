const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, // mandatory field return false if user try to get empty value.
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
/// Write Customize methods for mongoose.
// instance methods
todoSchema.methods = {
    findActive() {
        return mongoose.model('Todo').find({ status: 'active' });
    },
    findActiveCallback(cb) {
        return mongoose.model('Todo').find({ status: 'active' }, cb);
    },
};
// static methods
todoSchema.statics = {
    findByJS() {
        return this.find({ title: /js/i });
    },
};

// Query Helper methods

todoSchema.query = {
    byLanguage(language) {
        return this.find({ title: new RegExp(language, 'i') });
    },
};
module.exports = todoSchema;
