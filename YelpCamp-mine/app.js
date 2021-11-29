const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const { campSchema } = require('./schemas') //or ('./schemas.js')
const catchAsync = require('./utilities/catchAsync');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const ExpressError = require('../YelpCamp-Colt/utils/ExpressError');

mongoose.connect('mongodb://localhost:27017/yelpcamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log("Database connected")
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateCamp = (req, res, next) => {
    const { error } = campSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    }
    next();
}

app.get('/', (req, res) => {
    // res.send("Hello from Ylan's Yelp Camp")
    res.render('home');
})

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', validateCamp, catchAsync(async (req, res, next) => {
    const new_camp = new Campground(req.body.campground);
    await new_camp.save();
    res.redirect(`/campgrounds/${new_camp._id}`);
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id); //or req.params["id"]
    res.render('campgrounds/show', { camp });
}))

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { camp });
}))

app.put('/campgrounds/:id', validateCamp, catchAsync(async (req, res, next) => {
    const camp = await Campground.findByIdAndUpdate(req.params.id, req.body.campground, { runValidators: true, new: true });
    res.redirect(`/campgrounds/${camp._id}`);
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const remCampsite = await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found!', 404));
})

app.use((err, req, res, next) => {
    const { statCode = 500 } = err;
    if (!err.message)
        err.message = 'Oh no lan! Something went wrong!'
    res.status(statCode).render('error', { err })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})