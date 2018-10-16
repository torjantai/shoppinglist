'use strict';

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');

passport.use('signup', new localStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, async (userName, password, done) => {
    try {
        const user = await UserModel.create({ userName, password });
        return done(null, user)
    } catch (error) {
        done(error);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField : 'userName',
  passwordField : 'password'
}, async (userName, password, done) => {
  try {
    //Find the user associated with the userName provided by the user
    const user = await UserModel.findOne({ userName });
    if( !user ){
      //If the user isn't found in the database, return a message
      return done(null, false, { message : 'User not found'});
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    //Send the user information to the next middleware
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));
