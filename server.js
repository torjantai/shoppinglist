'use strict';

const express       = require('express');
const routes        = require('./routes/index');
const jsonParser    = require('body-parser').json;
const mongoose      = require('mongoose');
const logger        = require('morgan');

const app = express();


app.use(logger('dev'));
//use jsonParser to parse req.body
app.use(jsonParser({extended: true}));





// MONGO CONNECTION
mongoose.connect('mongodb://localhost:27017/shoppingList');
const db = mongoose.connection;

db.on('error', function(err){
    console.error('connection error:', err);
});

db.once('open', function() {
    console.log('db connection successful');
});

//uncomment following in order to grant cross-origin Access
// app.use(function(req, res, next, err){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE')
//         return res.status(200).json({});
//     }
//     next(err);
// });

// ROUTES
app.use('/', express.static('public'))
//create a virtual path /shoppinglist and use routes from /route
app.use('/shoppinglist', routes);


//ERROR HANDLING
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
