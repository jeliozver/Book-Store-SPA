const JWT = require('jsonwebtoken');
const LOCAL_STRATEGY = require('passport-local').Strategy;

const ENCRYPTION = require('../utilities/encryption');
const ROLE = require('mongoose').model('Role');
const USER = require('mongoose').model('User');
const CART = require('mongoose').model('Cart');

const SECRET = '5b362e2a094b97392c3d7bba';

function generateToken(userInfo) {
    const USER = {
        id: userInfo.id,
        username: userInfo.username,
        avatar: userInfo.avatar,
        isCommentsBlocked: userInfo.isCommentsBlocked,
        isAdmin: userInfo.isAdmin,
        roles: userInfo.roles
    };
    const PAYLOAD = { sub: USER };

    return JWT.sign(PAYLOAD, SECRET, { expiresIn: 604800000 });
}

module.exports = {
    localRegister: () => {
        return new LOCAL_STRATEGY({
            usernameField: 'username',
            passwordField: 'password',
            session: false,
            passReqToCallback: true
        }, (req, username, password, done) => {
            let user = {
                username: req.body.username,
                avatar: req.body.avatar,
                email: req.body.email,
                password: req.body.password
            };

            let salt = ENCRYPTION.generateSalt();
            let hashedPassword = ENCRYPTION.generateHashedPassword(salt, password);

            user.salt = salt;
            user.password = hashedPassword;

            ROLE.findOne({ name: 'User' }).then((role) => {
                user.roles = [role._id];

                USER.create(user).then((newUser) => {
                    role.users.push(newUser._id);
                    role.save();

                    let token = generateToken(newUser);

                    CART.create({ user: newUser._id }).then((cart) => {
                        newUser.cart = cart._id;
                        newUser.save();
                        return done(null, token);
                    });
                }).catch(() => {
                    return done(null, false);
                });
            });
        }
        );
    },

    localLogin: () => {
        return new LOCAL_STRATEGY({
            usernameField: 'username',
            passwordField: 'password',
            session: false
        }, (username, password, done) => {
            USER.findOne({ username: username }).then((user) => {
                if (!user) {
                    return done(null, false);
                }

                if (!user.authenticate(password)) {
                    return done(null, false);
                }

                let token = generateToken(user);

                return done(null, token);
            });
        }
        );
    }
};