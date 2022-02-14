const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.addReview = async (req, res) => {
    // res.send('You made it to review post.')
    //console.log(req.params)

    const { id } = req.params;
    const camp = await Campground.findById(id);
    const review = new Review(req.body.review);

    review.author = req.user._id;
    camp.reviews.push(review);
    await review.save();
    await camp.save();

    req.flash('succeed', 'Your review was created.');
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('succeed', 'Successfully deleted a review.');
    res.redirect(`/campgrounds/${id}`);
}