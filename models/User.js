'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const ListSchema = require('./index');

const UserSchema = new Schema({
    userName: {
        type: String,
        minlength: [ 6, 'Käyttäjätunnuksen on oltava 6 - 12 merkkiä pitkä' ],
        maxlength: [ 12, 'Käyttäjätunnuksen on oltava 6 - 12 merkkiä pitkä' ],
        required: [ true, 'Käyttäjätunnus on pakollinen' ],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lists: [ListSchema]
});

UserSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

//a user should always have at least one list to start with, here we check that
UserSchema.pre('save', function(next) {
    const defaultList = {
        listName: 'Kauppalista',
        items: [
            {
                article: 'tuote1',
                category: 'kategoria1',
                isNeeded: true
            }
        ]
    }
    if (this.lists.length === 0) {
        this.lists.push(defaultList);
    }
    next();
});

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
