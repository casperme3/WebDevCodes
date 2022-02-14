const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const catchAsync = require('../utilities/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

/////////////////////////////////////////////
/////// review routes below /////////////
/////////////////////////////////////////////
/*  
    '/campgrounds/:id/reviews' 
*/
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.addReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;