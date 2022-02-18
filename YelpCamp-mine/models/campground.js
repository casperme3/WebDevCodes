const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./user');
const Schema = mongoose.Schema;

// https://res.cloudinary.com/dbapxhh4h/image/upload/w_250/v1644828601/YlansYelpCamp/u0w76ruszvheeqabmqxt.jpg

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
},
    {
        toJSON: {
            virtuals: true  //this will allow Stringify to convert also virtual properties
        }
    }
);

CampgroundSchema.virtual('properties.popUpText').get(function () {
    return `<a href="/campgrounds/${this._id}"><h6>${this.title}</h6></a><p>${this.location}</p>`;
})

CampgroundSchema.post('findOneAndDelete', async function (camp) {
    if (camp.reviews.length) { //or "if (camp)"
        const result = await Review.deleteMany({ _id: { $in: camp.reviews } });
        console.log(result);
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema)