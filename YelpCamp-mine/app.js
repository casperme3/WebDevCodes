if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utilities/ExpressError');
const campgroundsRoute = require('./routes/campgrounds');
const reviewsRoute = require('./routes/reviews');
const usersRoute = require('./routes/users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const MongoDBStore = require('connect-mongo');

const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/yelpcamp';
const secret = process.env.SECRET || 'thisismysecretkey';

// mongoose.connect('');
mongoose.connect(dbURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoDBStore({
    mongoUrl: dbURL,
    secret,
    touchAfter: 24 * 3600
});

store.on('error', function (e) {
    console.log('Session Store Error', e);
});

const sessConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
//note order is important: if place under app.use 'campgroundsRoute' and 'reviewsRoute',
//this app.use 'session' will not be executed.
app.use(session(sessConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.succeed = req.flash('succeed');
    res.locals.error = req.flash('error');
    next();
})

//Sample:
//Example way of route handler to registering a user.
// app.get('/fakeUser', async (req, res) => {
//     const user = new User({ email: 'nolan@gmail.com', username: 'nolaniway' });
//     const newU = await User.register(user, 'hen');
//     res.send(newU);
// })

app.use('/', usersRoute);
app.use('/campgrounds', campgroundsRoute);
app.use('/campgrounds/:id/reviews', reviewsRoute);

app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found!', 404));
})

app.use((err, req, res, next) => {
    const { statCode = 500 } = err;
    if (!err.message)
        err.message = 'Oh no-lan! Something went wrong!'
    res.status(statCode).render('error', { err })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})