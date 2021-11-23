const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');

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

app.get('/', (req, res) => {
    // res.send("Hello from Ylan's Yelp Camp")
    res.render('home');
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async (req, res, next) => {
    try {
        const new_camp = new Campground(req.body.campground);
        await new_camp.save();
        res.redirect(`/campgrounds/${new_camp._id}`);
    } catch (e) {
        next(e);
    }
})

app.get('/campgrounds/:id', async (req, res) => {
    const camp = await Campground.findById(req.params.id); //or req.params["id"]
    res.render('campgrounds/show', { camp });
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { camp });
})

app.put('/campgrounds/:id', async (req, res, next) => {
    try {
        const camp = await Campground.findByIdAndUpdate(req.params.id, req.body.campground, { runValidators: true, new: true });
        res.redirect(`/campgrounds/${camp._id}`);
    } catch (e) {
        next(e);
    }
})

app.delete('/campgrounds/:id', async (req, res) => {
    const remCampsite = await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
})

app.use((err, req, res, next) => {
    res.send("Ohh no! Something went wrong.");
})

// app.get('/makecampground', async (req, res) => {
//     const campsite = new Campground({
//         title: 'My Crib',
//         price: '0.00'
//     })
//     await campsite.save();
//     res.send(campsite)
// })

app.listen(3000, () => {
    console.log("Listening on port 3000")
})