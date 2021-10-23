// Build RESTFul API

/* Install Requirements
   Express -> Handling request to server
   Nodemon -> Utility that will monitor for any changes in your source 
                and automatically restart your server.
                usage: replace 'node' with 'nodemon' in cli
*/

// Import package
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

require('dotenv/config'); // Get access of env

// Import Routes
const getRoutes = require('./routes/route');

// Middleware
// e.g localhost:<port>/maindata/<data1/data2>
app.use('/maindata', getRoutes);


// Connect to db
mongoose.connect(
    process.env.DB_URL, 
    {useNewUrlParser:true}, ()=>{
    console.log('Connected to DB');
});

// Check if app has connected to server
app.listen(3000, ()=> {
    console.log('Connected to server on port 3000');
});

