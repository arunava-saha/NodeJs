// Importing mongoose
const mongoose = require("mongoose");

// Connecting mongoose to the database
mongoose.connect("mongodb://127.0.0.1:27017/TodoApp");

// Creating a database connection
const db = mongoose.connection;

// Printing an error on the console if fails to connect to the database
db.on('error', error => {
    console.log(error);
});

// Printing a message to the console after a successful connection
db.once("open", function () {
    console.log("Database is up and running!");
});