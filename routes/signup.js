const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware in auth/auth.js
router.post(
    '/signup',
    passport.authenticate('signup', { session : false }),
    async (req, res, next) => {
        res.json({
            message : 'Signup successful',
            user : req.user
        });
    }
);

router.post('/login', async (req, res, next) => {
    console.log(req.body);
  passport.authenticate('login', async (err, user, info) => {     try {
      if (err) return next(err);
      if (!user) {
        const error = new Error('No such user');
        error.status = 404;
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the username and id
        const body = { _id : user._id, userName : user.userName };
        //Sign the JWT token and populate the payload with the username and id
        //NOTE: secret must be moved to another file in production
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
        return res.json({ token });
      });     } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
