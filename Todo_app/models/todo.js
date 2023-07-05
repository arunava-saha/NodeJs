// Importing the Mongoose library
const mongoose = require('mongoose');

// Creating a Schema for Todos
const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// Creating a model based on the todoSchema
const Todo = mongoose.model('Todo', todoSchema);

// Exporting the Todo model so it can be used in other files
module.exports = Todo;