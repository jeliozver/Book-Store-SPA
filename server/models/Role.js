const MONGOOSE = require('mongoose');

const USER = MONGOOSE.model('User');
const CART = MONGOOSE.model('Cart');
const ENCRYPTION = require('../utilities/encryption');
const STRING = MONGOOSE.Schema.Types.String;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const ROLE_SCHEMA = MONGOOSE.Schema({
    name: { type: STRING, required: true, unique: true },
    users: [{ type: OBJECT_ID, ref: 'User' }]
});

const ROLE = MONGOOSE.model('Role', ROLE_SCHEMA);

module.exports = ROLE;

module.exports.init = () => {
    ROLE.findOne({ name: 'Admin' }).then((role) => {
        if (!role) {
            ROLE.create({ name: 'Admin' }).then((newRole) => {
                let salt = ENCRYPTION.generateSalt();
                let passwordHash = ENCRYPTION.generateHashedPassword(salt, 'admin');
                let adminUser = {
                    username: 'admin',
                    email: 'admin@admin.com',
                    salt: salt,
                    password: passwordHash,
                    isAdmin: true,
                    roles: [newRole._id]
                };

                USER.create(adminUser).then((user) => {
                    newRole.users.push(user._id);
                    newRole.save();

                    CART.create({ user: user._id }).then((cart) => {
                        user.cart = cart._id;
                        user.save();
                    });
                });
            });
        }
    });

    ROLE.findOne({ name: 'User' }).then((role) => {
        if (!role) {
            ROLE.create({ name: 'User' }).then((newRole) => {
                let salt = ENCRYPTION.generateSalt();
                let passwordHash = ENCRYPTION.generateHashedPassword(salt, '123');
                let newUser = {
                    username: 'jeliozver',
                    email: 'jeliozver@gmail.com',
                    salt: salt,
                    password: passwordHash,
                    roles: [newRole._id]
                };

                USER.create(newUser).then((nu) => {
                    newRole.users.push(nu._id);
                    newRole.save();
                    CART.create({ user: nu._id }).then((cart) => {
                        nu.cart = cart._id;
                        nu.save();
                    });
                });
            });
        }
    });
};