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
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const new_camp = new Campground({
            //Your User ID
            author: '61f79e3af26bdf71074fa077',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis ab, nemo ad voluptas cum eos amet dolorum adipisci dignissimos, aliquid libero, asperiores reprehenderit tempora! Omnis nulla a vel laboriosam ea.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbapxhh4h/image/upload/v1645004921/YlansYelpCamp/n02mcq62nuteegdhrfqo.jpg',
                    filename: 'YlansYelpCamp/n02mcq62nuteegdhrfqo'
                },
                {
                    url: 'https://res.cloudinary.com/dbapxhh4h/image/upload/v1644910960/YlansYelpCamp/r3snlf6knvipgebzicg8.jpg',
                    filename: 'YlansYelpCamp/r3snlf6knvipgebzicg8'
                },
                {
                    url: 'https://res.cloudinary.com/dbapxhh4h/image/upload/v1644819687/YlansYelpCamp/tuoszcmwsshgqbvispot.jpg',
                    filename: 'YlansYelpCamp/tuoszcmwsshgqbvispot.jpg'
                }
            ]
        })
        await new_camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})