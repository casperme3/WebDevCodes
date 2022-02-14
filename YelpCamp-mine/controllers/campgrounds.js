const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.saveCampground = async (req, res, next) => {

    const new_camp = new Campground(req.body.campground);
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
    const camp = await Campground.findByIdAndUpdate(id, req.body.campground, { runValidators: true, new: true });
    const images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    camp.images.push(...images);
    await camp.save();

    req.flash('succeed', 'Successfully updated a campground.');
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.deleteCamp = async (req, res) => {
    const remCampsite = await Campground.findByIdAndDelete(req.params.id);
    req.flash('succeed', 'Successfully deleted a campground.');
    res.redirect('/campgrounds');
}