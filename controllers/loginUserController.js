const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
        if (user) {
            console.log('Fetched user:', user);
            console.log('Password to compare:', password);
            console.log('User\'s password:', user.password);
            // Compare passwords only if user is found
            bcrypt.compare(password, user.password).then((match) => {
                console.log('Passwords match:', match);
                if (match) {
                    req.session.userId = user._id;
                    res.redirect('/home');
                } else {
                    res.redirect('/login');
                    console.log('fak')
                }
            }).catch((compareError) => {
                console.error(compareError);
                res.redirect('/login');
            });
        } else {
            res.redirect('/login');
        }
    }).catch((findError) => {
        console.error(findError);
        res.redirect('/login');
    });
};
