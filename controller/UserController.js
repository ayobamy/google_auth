const User = require('../models/UserModel');

exports.checkAuth = (req, res) => {
    if (req.user) {
        res.json({ message: `Welcome ${req.user.name.givenName} ${req.user.name.familyName}` });
    } else {
        res.sendStatus(401);
    }
};

exports.login = (req, res) => {
    const { id, name, email } = req.user;
    const fullName = `${name.familyName} ${name.givenName}`;
    User.findOneAndUpdate({ id }, { name: fullName, email }, { upsert: true })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};


exports.logout = (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
};
