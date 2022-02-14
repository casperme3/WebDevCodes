const express = require('express');
const session = require('express-session');
const app = express();

const sessOpt = {
    secret: 'thisisnotsosecret',
    resave: false,
    saveUninitialized: true
}
app.use(session(sessOpt));

app.get('/viewscount', (req, res) => {
    if (req.session.views) {
        req.session.views += 1;
    } else {
        req.session.views = 1;
    }
    res.send(`You viewed this ${req.session.views} number of times.`);
})

app.get('/register', (req, res) => {
    const { username = 'Unknown' } = req.query;
    req.session.username = username;
    res.redirect('/greet');
})

app.get('/greet', (req, res) => {
    const { username, views } = req.session;
    res.send(`Welcome back ${username}, visited: ${views}`)
})

app.listen(3000, () => {
    console.log('App is listening on port 3000!!!');
})