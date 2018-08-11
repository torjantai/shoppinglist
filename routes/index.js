'use strict';

const express = require('express');
const router = new express.Router();
const List = require('../models').List;
//const Items = require('../models').Items;


//all url's in this file will be prefixed with /shoppingList
//as defined in server.js app.use('/shoppinglist', routes)


//GET all the lists
router.get('/', function(req, res, next) {
    List.find({})
            .exec(function(err, items) {
                if (err) return next(err);
                res.json(items);
            });
});

//POST lists -- create a list
router.post('/', function(req, res, next) {
    console.log(req.body);
    const list = new List(req.body);
    list.save(function(err, list) {
        if (err) return next(err);
        res.status(201);
        res.json(list);
    });
});

//GET a single list with given id
router.get('/:listId', function (req, res, next) {
    List.findById(req.params.listId, function (err, doc) {

        if (err) return next(err);
        if (!doc) {
            err = new Error(`No list found with id ${req.params.listId}`);
            err.status = 404;
            return next(err);
        }
        res.json(doc);
    });
});

//delete a list
router.delete('/:listId/', function(req, res, next) {
    List.findById(req.params.listId, function (err, doc) {
        if (err) return next(err);
        if (!doc) {
            err = new Error(`No list found with id ${req.params.listId}`);
            err.status = 404;
            return next(err);
        }

        doc.remove(function (err) {
            if (err) return next(err);

        });
        List.find({})
                .exec(function(err, items) {
                    if (err) return next(err);
                    res.status(201);
                    res.json(items);
                });
    });
});

//edit a list


//POST /:id/item
//create an item in a given list
router.post('/:listId/items', function(req, res, next) {
    console.log(req.body);
    List.findById(req.params.listId, function (err, doc) {
        //console.dir(doc);
        if (err) return next(err);
        if (!doc) {
            err = new Error(`No list found with id ${req.params.listId}`);
            err.status = 404;
            return next(err);
        }
        if (!req.body.article || !req.body.category) {
            err = new Error(`article and category mandatory`);
            console.log(err);
            err.status = 500;
            return next(err);
        }
        doc.items.push(req.body);
        doc.save(function(err, question) {
            if (err) return next(err);
            res.status(201);
            res.json(doc);
        });
    });
});




//edit a specific item in a given list
//update method is defined on ItemSchema
router.put('/:listId/items/:itemId', function(req, res, next) {
    List.findById(req.params.listId, function (err, doc) {
        if (err) return next(err);
        if (!doc) {
            err = new Error(`No list found with id ${req.params.listId}`);
            err.status = 404;
            return next(err);
        }
        const item = doc.items.id(req.params.itemId);
        if (!item) {
            err = new Error(`No item found with id ${req.params.itemId}`);
            err.status = 404;
            return next(err);
        }
        item.update(req.body, function (err, result) {
            if (err) return next(err);
            res.json(doc);
        });
    });
});


//delete a specific item in a given lists
router.delete('/:listId/items/:itemId', function(req, res, next) {
    List.findById(req.params.listId, function (err, doc) {
        if (err) return next(err);
        if (!doc) {
            err = new Error(`No list found with id ${req.params.listId}`);
            err.status = 404;
            return next(err);
        }
        const item = doc.items.id(req.params.itemId);
        if (!item) {
            err = new Error(`No item found with id ${req.params.itemId}`);
            err.status = 404;
            return next(err);
        }
        item.remove(function (err) {
            if (err) return next(err);
            doc.save(function(err, question) {
                if (err) return next(err);
                res.status(201);
                res.json(doc);
            });

        });
    });
});










module.exports = router;
