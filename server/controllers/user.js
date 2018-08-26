const VALIDATOR = require('validator');
const PASSPORT = require('passport');
const USER = require('mongoose').model('User');
const RECEIPT = require('mongoose').model('Receipt');

function validateRegisterForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.email !== 'string' || !VALIDATOR.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
        isFormValid = false;
        errors.password = 'Password must have at least 3 characters.';
    }

    if (!payload || payload.password !== payload.confirmPassword) {
        isFormValid = false;
        errors.passwordsDontMatch = 'Passwords do not match!';
    }

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (payload.avatar.trim().length !== 0) {
        if (!VALIDATOR.isURL(payload.avatar)) {
            isFormValid = false;
            errors.avatar = 'Please provide a valid link to your avatar image or leave the field empty.';
        }
    } else {
        if (payload.hasOwnProperty('avatar')) {
            delete payload['avatar'];
        }
    }

    return {
        success: isFormValid,
        errors
    };
}

function validateLoginForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    return {
        success: isFormValid,
        errors
    };
}

function validateAvatarForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || !VALIDATOR.isURL(payload.avatar)) {
        isFormValid = false;
        errors.avatar = 'Please provide a valid link to your avatar image.';
    }

    return {
        success: isFormValid,
        errors
    };
}

module.exports = {
    register: (req, res) => {

        let validationResult = validateRegisterForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Register form validation failed!',
                errors: validationResult.errors
            });
        }

        PASSPORT.authenticate('local-register', (err, token) => {
            if (err || !token) {
                return res.status(400).json({
                    message: 'Registration failed!',
                    errors: { 'taken': 'Username or email already taken' }
                });
            }

            return res.status(200).json({
                message: 'Registration successful!',
                data: token
            });
        })(req, res);
    },

    login: (req, res) => {
        let validationResult = validateLoginForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Login form validation failed!',
                errors: validationResult.errors
            });
        }

        PASSPORT.authenticate('local-login', (err, token) => {
            if (err || !token) {
                return res.status(400).json({
                    message: 'Invalid Credentials!'
                });
            }

            return res.status(200).json({
                message: 'Login successful!',
                data: token
            });
        })(req, res);
    },

    getProfile: (req, res) => {
        let username = req.params.username;

        USER.findOne({ username: username })
            .populate('favoriteBooks')
            .then((user) => {
                if (!user) {
                    return res.status(400).json({
                        message: `User ${username} not found in our database`
                    });
                }

                let userToSend = {
                    id: user.id,
                    isAdmin: user.isAdmin,
                    username: user.username,
                    avatar: user.avatar,
                    commentsCount: user.commentsCount,
                    favoriteBooks: user.favoriteBooks,
                };

                return res.status(200).json({
                    message: '',
                    data: userToSend
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    message: 'Something went wrong, please try again.'
                });
            });
    },

    getPurchaseHistory: (req, res) => {
        let userId = req.user.id;
        RECEIPT
            .find({ user: userId })
            .sort({ creationDate: -1 })
            .then((receipts) => {
                res.status(200).json({
                    message: '',
                    data: receipts
                });
            });
    },

    changeAvatar: (req, res) => {
        let requesterId = req.user.id;
        let requesterIsAdmin = req.user.isAdmin;
        let userToChange = req.body.id;
        let newAvatar = req.body.avatar;

        let validationResult = validateAvatarForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Avatar form validation failed!',
                errors: validationResult.errors
            });
        }

        if (requesterId !== userToChange && !requesterIsAdmin) {
            return res.status(401).json({
                message: 'You\'re not allowed to change other user avatar!'
            });
        }

        USER
            .update({ _id: userToChange }, { $set: { avatar: newAvatar } })
            .then(() => {
                return res.status(200).json({
                    message: 'Avatar changed successfully!'
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    message: 'Something went wrong, please try again.'
                });
            });
    },

    blockComments: (req, res) => {
        let userId = req.params.userId;

        USER.findById(userId).then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: `User ${user.username} not found in our database`
                });
            }

            user.isCommentsBlocked = true;
            user.save();

            res.status(200).json({
                message: `User ${user.username} blocked from posting comments!`
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    unblockComments: (req, res) => {
        let userId = req.params.userId;

        USER.findById(userId).then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: `User ${user.username} not found in our database`
                });
            }

            user.isCommentsBlocked = false;
            user.save();

            res.status(200).json({
                message: `User ${user.username} can now post comments!`
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    }
};