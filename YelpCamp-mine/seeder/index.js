const mongoose = require('mongoose');
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const new_camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251/1600x900',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis ab, nemo ad voluptas cum eos amet dolorum adipisci dignissimos, aliquid libero, asperiores reprehenderit tempora! Omnis nulla a vel laboriosam ea.',
            price
        })
        await new_camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})