//import required modules
const express = require('express');
const path = require('path');

//app as an express application
const app = express();

//set the port on 80
const port = 8000;

//import db 
const db = require('./config/mongoose');

//import todo model
const Todo = require('./models/todo');

//set the view engine to EJS
app.set("view engine", "ejs");

//set the path
app.set("views", path.join(__dirname, "views"));

//middleware to parse the incoming data in the request body
app.use(express.urlencoded({ extended: true }));

//middleware to server static files from the assets
app.use(express.static('assets'));

// Route for the home page
// Route for the home page
app.get("/", (req, res) => {
    // Find all todos in the database using the Todo model
    Todo.find({})
        .then((todos) => {
            // Format the date of each todo's to 'Jul 20, 2023'
            const formattedTodos = todos.map((todo) => {
                // Convert the 'date' field from the todo document to a Date object
                const todoDate = new Date(todo.date);

                // Format the date using 'toLocaleDateString'
                const formattedDate = todoDate.toLocaleDateString("English", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });

                // Create a new object with the formatted date and other fields
                return {
                    ...todo._doc,
                    date: formattedDate,
                };
            });

            // Render the 'home' view with the todos and the formatted date
            return res.render("home", {
                title: "Todo App",
                todo: formattedTodos,
            });
        })
        .catch((error) => {
            console.error("Error finding todos:", error);
            return;
        });
});


// Route to handle creating a new todo
app.post("/create-todo", (req, res) => {
    // Get the todo details from the request body
    const newTodo = {
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
    }

    // Create a new todo in the database using the Todo model
    Todo.create(newTodo).then(todo => {
        // console.log('Todo created successfully: ', todo);
        // Redirect back to the previous page after todo creation is complete
        return res.redirect("back");
    })
        .catch(error => {
            console.error('Error creating Todo:', error);
            return;
        });
});


// Route to handle deleting todos
app.post('/delete-todo', async function (req, res) {
    // Get the array of ids from the body of the request
    const idsToDelete = Object.keys(req.body);

    // Checking if there are any ids to delete
    if (!idsToDelete || idsToDelete.length === 0) {
        return res.redirect('back');
    }

    try {
        // Find and delete todos using the $in operator with async/await
        await Todo.deleteMany({ _id: { $in: idsToDelete } });
        // console.log('Todos deleted successfully');
        // Redirect back to the previous page after the deletion is complete
        return res.redirect('back');
    } catch (error) {
        console.log('Error in deleting todos:', error);
        // Handle error and redirect back to the previous page
        return res.redirect('back');
    }
});

//start the server and listen on the port
app.listen(port, function (error) {
    if (error) {
        console.log(`error in port : ${error}`);
    }
    console.log(`server is running and no error in port : ${port}`);
});
