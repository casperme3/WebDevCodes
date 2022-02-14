const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateCamp, isAuthor } = require('../middleware');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

/////////////////////////////////////////////
/////// campground routes below /////////////
/////////////////////////////////////////////

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCamp, catchAsync(campgrounds.saveCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.viewCamp))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCamp, catchAsync(campgrounds.saveEditCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditCamp))

module.exports = router;