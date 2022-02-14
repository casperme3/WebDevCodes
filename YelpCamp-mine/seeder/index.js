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
            author: '61f79e3af26bdf71074fa077',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis ab, nemo ad voluptas cum eos amet dolorum adipisci dignissimos, aliquid libero, asperiores reprehenderit tempora! Omnis nulla a vel laboriosam ea.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dbapxhh4h/image/upload/v1644481982/YlansYelpCamp/nt8mbvi9f5xlhy6myhfb.jpg',
                    filename: 'YlansYelpCamp/nt8mbvi9f5xlhy6myhfb'
                },
                {
                    url: 'https://res.cloudinary.com/dbapxhh4h/image/upload/v1644481982/YlansYelpCamp/brh1aarbjreso1n4fxao.jpg',
                    filename: 'YlansYelpCamp/brh1aarbjreso1n4fxao'
                },
                {
                    url: 'https://res.cloudinary.com/dbapxhh4h/image/upload/v1644481982/YlansYelpCamp/qo0q7xz90ybuum0h2eit.jpg',
                    filename: 'YlansYelpCamp/qo0q7xz90ybuum0h2eit'
                }
            ]
        })
        await new_camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})