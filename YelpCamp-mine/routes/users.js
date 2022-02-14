const express = require('express');
const passport = require('passport');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utilities/catchAsync');


/////////////////////////////////////////////
////////// user routes below ////////////////
/////////////////////////////////////////////

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.addUser))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        catchAsync(users.loginUser))

router.get('/logout', users.logoutUser)

module.exports = router;