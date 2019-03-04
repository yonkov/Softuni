const User = require('mongoose').model('User');
const encryption = require('./../utilities/encryption');

module.exports = {
    registerGet: (req, res) => {
        
        res.render('users/register');
    },

    registerPost: (req, res) => {
        let userBody = req.body;

        User.findOne({
            username: userBody.username
        }).then(user => {
            let errorMsg = '';
            if (user) {
                errorMsg = 'User with the same username exists!';
            }

            if (errorMsg) {
                userBody.error = errorMsg;
                res.render('users/register', userBody)
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.generateHashedPassword(salt, userBody.password);

                let userObject = {
                    username: userBody.username,
                    passwordHash: passwordHash,
                    firstName: userBody.firstName,
                    lastName: userBody.lastName,
                    salt: salt,
                    roles: ['User']
                };

                User.create(userObject).then(user => {
                    req.logIn(user, (err) => {
                        if (err) {
                            userBody.error = err.message;
                            res.render('users/register', userBody);
                            return;
                        }
                        res.redirect('/');
                    })
                });
            }
        })
    },

    loginGet: (req, res) => {
        res.render('users/login');
    },

    loginPost: (req, res) => {
        let userBody = req.body;
        User.findOne({
            username: userBody.username
        }).then(user => {
            if (!user || !user.authenticate(userBody.password)) {
                let errorMsg = 'Either username or password is invalid!';
                userBody.error = errorMsg;
                res.render('users/login', userBody);
                return;
            }

            req.login(user, (err) => {
                if (err) {
                    res.render('users/login', {
                        error: err.message
                    });
                    return;
                }

                let returnUrl = '/';
                if (req.session.returnUrl) {
                    returnUrl = req.session.returnUrl;
                    delete req.session.returnUrl;
                }
                res.redirect(returnUrl);
            })
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    }
};