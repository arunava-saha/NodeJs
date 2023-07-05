const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/school');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to the db'));

db.once('open', function () {
    console.log('connected to db successfilly!!')
})