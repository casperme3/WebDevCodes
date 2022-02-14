const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('cookieSecret'));

//////////////////////////////////
app.get('/greet', (req, res) => {
    const { name, animal } = req.cookies;
    res.send(`Hey didol didol.. ${name} and ${animal}`);
})

app.get('/namesetter', (req, res) => {
    res.cookie('name', 'ylan daern');
    res.cookie('animal', 'flubber');
    res.send('OK name was set.');
})

//////////////////////////////////
app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'lychee', { signed: true });
    res.send('Signing your cookie.')
})

app.get('/verifysigned', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send('Show verified cookies.')
})

app.listen(3000, () => {
    console.log('Serving at port 3000!!!')
})