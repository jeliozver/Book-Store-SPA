const VALIDATOR = require('validator');
const PASSPORT = require('passport');
const USER = require('mongoose').model('User');

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
        // TODO
    },

    blockComments: (req, res) => {
        // TODO
    },

    unblockComments: (req, res) => {
        // TODO
    }
};