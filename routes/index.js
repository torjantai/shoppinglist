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
router.get('/:username', function(req, res, next) {
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


//NOTE: everything below is based on the old data structure
//
// //POST lists -- create a list
// router.post('/', function(req, res, next) {
//     console.log(req.body);
//     const list = new List(req.body);
//     list.save(function(err, list) {
//         if (err) return next(err);
//         res.status(201);
//         res.json(list);
//     });
// });
//
// //GET a single list with given id
// router.get('/:listId', function (req, res, next) {
//     List.findById(req.params.listId, function (err, doc) {
//
//         if (err) return next(err);
//         if (!doc) {
//             err = new Error(`No list found with id ${req.params.listId}`);
//             err.status = 404;
//             return next(err);
//         }
//         res.json(doc);
//     });
// });
//
// //delete a list
// router.delete('/:listId/', function(req, res, next) {
//     List.findById(req.params.listId, function (err, doc) {
//         if (err) return next(err);
//         if (!doc) {
//             err = new Error(`No list found with id ${req.params.listId}`);
//             err.status = 404;
//             return next(err);
//         }
//
//         doc.remove(function (err) {
//             if (err) return next(err);
//             //after deleting, respond with all lists
//             List.find({})
//                     .exec(function(err, items) {
//                         if (err) return next(err);
//                         res.status(201);
//                         res.json(items);
//                     });
//         });
//
//     });
// });
//
// //edit a list
// router.put('/:listId/', function(req, res, next) {
//     List.findById(req.params.listId, function (err, doc) {
//         if (err) return next(err);
//         if (!doc) {
//             err = new Error(`No list found with id ${req.params.listId}`);
//             err.status = 404;
//             return next(err);
//         }
//         doc.listName = req.body.listName;
//         doc.save(function(err) {
//             if (err) return next(err);
//             res.status(201);
//             res.json(doc);
//         });
//     });
// });
//
// //POST /:id/item
// //create an item in a given list
// router.post('/:listId/items', function(req, res, next) {
//     console.log(req.body);
//     List.findById(req.params.listId, function (err, doc) {
//         //console.dir(doc);
//         if (err) return next(err);
//         if (!doc) {
//             err = new Error(`No list found with id ${req.params.listId}`);
//             err.status = 404;
//             return next(err);
//         }
//         if (!req.body.article || !req.body.category) {
//             err = new Error(`article and category mandatory`);
//             console.log(err);
//             err.status = 500;
//             return next(err);
//         }
//         doc.items.push(req.body);
//         doc.save(function(err, question) {
//             if (err) return next(err);
//             res.status(201);
//             res.json(doc);
//         });
//     });
// });
//
//
//
//
// //edit a specific item in a given list
// //update method is defined on ItemSchema
// router.put('/:listId/items/:itemId', function(req, res, next) {
//     List.findById(req.params.listId, function (err, doc) {
//         if (err) return next(err);
//         if (!doc) {
//             err = new Error(`No list found with id ${req.params.listId}`);
//             err.status = 404;
//             return next(err);
//         }
//         const item = doc.items.id(req.params.itemId);
//         if (!item) {
//             err = new Error(`No item found with id ${req.params.itemId}`);
//             err.status = 404;
//             return next(err);
//         }
//         item.update(req.body, function (err, result) {
//             if (err) return next(err);
//             res.json(doc);
//         });
//     });
// });
//
//
// //delete a specific item in a given lists
// router.delete('/:listId/items/:itemId', function(req, res, next) {
//     List.findById(req.params.listId, function (err, doc) {
//         if (err) return next(err);
//         if (!doc) {
//             err = new Error(`No list found with id ${req.params.listId}`);
//             err.status = 404;
//             return next(err);
//         }
//         const item = doc.items.id(req.params.itemId);
//         if (!item) {
//             err = new Error(`No item found with id ${req.params.itemId}`);
//             err.status = 404;
//             return next(err);
//         }
//         item.remove(function (err) {
//             if (err) return next(err);
//             doc.save(function(err, question) {
//                 if (err) return next(err);
//                 res.status(201);
//                 res.json(doc);
//             });
//
//         });
//     });
// });










module.exports = router;
