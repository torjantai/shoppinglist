'use strict';

const express = require('express');
const router = new express.Router();
const List = require('../models').List;
const User = require('../models/User');
const passport = require('passport');
//const Items = require('../models').Items;

//require jwt with every req
router.use(passport.authenticate('jwt', { session : false }));

//all url's in this file will be prefixed with /shoppingList
//as defined in server.js app.use('/shoppinglist', routes)

//router.param() will catch any route that includes 'username'
//user document will be stored on req.userDocument
router.param('username', function(req, res, next, username) {
        console.log('router.param', username);
        //check that req.user from token equals to username on route
        //req.user comes from passport.authenticate
        if (req.user.userName !== username) {
            return res.send(401);
        }
        //find user and store the doc on req object
        User.findOne( { userName: username }, function (err, doc) {

            if (err) return next(err);
            if (!doc) {
                err = new Error(`No user found with id ${username}`);
                err.status = 404;
                return next(err);
            }
            // console.log(doc);
            req.userDocument = doc;
            return next();
            });
});


//GET a single user with given id
router.get('/:username', function(req, res) {
        console.log('get username');
        res.json(req.userDocument);
});

//POST lists -- create a list under a user
//req.userDocument comes from router.param()
router.post('/:username', function(req, res, next) {
    console.log(req.body, req.params);

    req.userDocument.lists.push(req.body);
    req.userDocument.save(function(err, doc) {
        if (err) return next(err);
        res.status(201);
        res.json(doc);
    });
});


//GET a single list with a given id
router.get('/:username/:listId', function(req, res, next) {
    console.log('/:username/:listId', req.userDocument);
    const list = req.userDocument.lists.id(req.params.listId);
    if ( !list ) {
        const err = new Error(`No list found with id ${req.params.listId}`);
        err.status = 404;
        return next(err);
    }
    res.json(list);
});

router.put('/:username/:listId', function(req, res, next) {
    console.log('route /:username/:listId', 'body;', req.body )
    let list = req.userDocument.lists.id(req.params.listId);
    if ( !list ) {
        const err = new Error(`No list found with id ${req.params.listId}`);
        err.status = 404;
        return next(err);
    }

    list.set(req.body);
    req.userDocument.save(function(err, next) {
        if (err) return next(err);
        res.status(201);
        res.json(req.userDocument);
    });
});

router.delete('/:username/:listId', function(req, res, next) {
    let list = req.userDocument.lists.id(req.params.listId);
    if ( !list ) {
        const err = new Error(`No list found with id ${req.params.listId}`);
        err.status = 404;
        return next(err);
    }

    list.remove();
    req.userDocument.save(function(err, doc) {
        if (err) return next(err);
        res.status(201);
        res.json(req.userDocument);
    });
});


module.exports = router;
