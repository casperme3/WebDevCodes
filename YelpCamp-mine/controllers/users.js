const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.addUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const regUser = await User.register(user, password);
        req.login(regUser, (err) => {
            if (err) return next(err);
            req.flash('succeed', 'New user registered!');
            res.redirect('/campgrounds');
        })
        // console.log(regUser);
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = async (req, res) => {
    const { username } = req.body;
    req.flash('succeed', `Welcome back! ${username}`);
    const redirectUrl = req.session.returnUrl || '/campgrounds';
    delete req.session.returnUrl;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    req.logOut();
    req.flash('succeed', 'Goodbye!');
    res.redirect('/campgrounds')
}