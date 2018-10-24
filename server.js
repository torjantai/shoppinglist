'use strict';

const express       = require('express');
const routes        = require('./routes/index');
const jsonParser    = require('body-parser').json;
const mongoose      = require('mongoose');
const logger        = require('morgan');
require('./auth/auth');

const app = express();
const db = mongoose.connection;

//set timeout for mongoose reconnect
const mongoTimeout = 30000;

app.use(logger('dev'));
//use jsonParser to parse req.body
app.use(jsonParser({extended: true}));





// MONGO CONNECTION

db.on('error', function(err){
    console.error('connection error:', err);
    mongoose.disconnect();
});

db.on('disconnected', function() {
    console.log(`MongoDB disconnected, reconnecting in ${mongoTimeout/1000} seconds`);
    setTimeout(function mongoConnet() {
        mongoose.connect('mongodb://localhost:27017/shoppingList');
    }, mongoTimeout );
});


db.once('open', function() {
    console.log('db connection successful');
});

mongoose.connect('mongodb://localhost:27017/shoppingList',
    {autoReconnect: true});


// ROUTES
app.use('/', require('./routes/signup'));
app.use('/', express.static('public'));
//create a virtual path /shoppinglist and use routes from /route
app.use('/shoppinglist', routes);


//ERROR HANDLING
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Endpoint Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: { message: err.message }});
});


const port = process.env.PORT || 3001;
app.listen(port, console.log(`API listening on port ${port}`));
