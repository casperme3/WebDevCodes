const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');


mongoose.connect('mongodb://localhost:27017/loginDemo');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sessOpt = {
    secret: 'thisisnotsosecret',
    resave: false,
    saveUninitialized: true
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session(sessOpt));
app.use(express.urlencoded({ extended: true }));

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

app.get('/', (req, res) => {
    res.send('You are home!');
})


app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const registered = new User({ username, password })
    await registered.save();

    req.session.user_id = registered._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);

    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret')
    } else {
        res.redirect('/login')
    }
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})

app.post('/logout', (req, res) => {
    req.session.destroy();
    // req.session.user_id = null;
    res.redirect('/login');
})

app.listen(3000, () => {
    console.log('App is Serving!!!')
})