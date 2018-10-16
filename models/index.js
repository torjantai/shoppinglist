'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


const ItemSchema = new Schema({
    article: {required: true, type: String, trim: true},
    category: {required: true, type: String, trim: true},
    isNeeded: {required: true, type: Boolean}
});


//owner will be replaced with ownerid once authenticating will be implemented
const ListSchema = new Schema({
    listName: {required: true, type: String, trim: true},
    owner: {required: true, type: String, trim: true},
    items: [ItemSchema]
});

ItemSchema.method('update', function(updates, callback) {
    Object.assign(this, updates);
    this.parent().save(callback);
});



//Capitalize the first letter in articles and categories
ItemSchema.pre('save', function(next) {
    this.article = this.article[0].toUpperCase() + this.article.substring(1);
    this.category = this.category[0].toUpperCase() + this.category.substring(1);
    next();
});


const List = mongoose.model('List', ListSchema);
const Items = mongoose.model('Items', ItemSchema);


module.exports.List = List;
module.exports.Items = Items;
