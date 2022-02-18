const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.saveCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    // console.log(geoData.body.features[0].geometry);
    // res.send('OK');
    const new_camp = new Campground(req.body.campground);
    new_camp.geometry = geoData.body.features[0].geometry;
    new_camp.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    new_camp.author = req.user._id;
    await new_camp.save();

    console.log(new_camp);
    req.flash('succeed', 'Camp ground created successfully!');
    res.redirect(`/campgrounds/${new_camp._id}`);
}

module.exports.viewCamp = async (req, res) => {
    // const loggedUser = res.locals.currUser || ' ';
    const camp = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author'); //or req.params["id"]
    // console.log(camp)
    // console.log('------------');
    // console.log(currUser);
    if (!camp) {
        req.flash('error', 'Error! cannot find campground id.');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { camp });
}

module.exports.renderEditCamp = async (req, res) => {
    const { id } = req.params;

    const camp = await Campground.findById(id);
    if (!camp) {
        req.flash('error', 'Error! cannot find campground id.');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { camp });
}

module.exports.saveEditCamp = async (req, res, next) => {
    const { id } = req.params;

    console.log(req.body);

    const camp = await Campground.findByIdAndUpdate(id, req.body.campground, { runValidators: true, new: true });
    const images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    camp.images.push(...images);
    await camp.save();

    if (req.body.deleteImages) {
        for (let fname of req.body.deleteImages) {
            await cloudinary.uploader.destroy(fname);
        }
        await camp.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    console.log(camp);

    req.flash('succeed', 'Successfully updated a campground.');
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.deleteCamp = async (req, res) => {
    const remCampsite = await Campground.findByIdAndDelete(req.params.id);
    req.flash('succeed', 'Successfully deleted a campground.');
    res.redirect('/campgrounds');
}