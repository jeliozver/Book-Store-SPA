const MONGOOSE = require('mongoose');

const ENCRYPTION = require('../utilities/encryption');
const STRING = MONGOOSE.Schema.Types.String;
const BOOLEAN = MONGOOSE.Schema.Types.Boolean;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const USER_SCHEMA = MONGOOSE.Schema({
    username: { type: STRING, required: true, unique: true },
    email: { type: STRING, required: true, unique: true },
    password: { type: STRING, required: true },
    salt: { type: STRING, required: true },
    isAdmin: { type: BOOLEAN, default: false },
    isCommentsBlocked: { type: BOOLEAN, default: false },
    roles: [{ type: OBJECT_ID, ref: 'Role' }],
    cart: { type: OBJECT_ID, ref: 'Cart' },
    purchasedBooks: [{ type: OBJECT_ID, ref: 'Book' }],
    favoriteBooks: [{ type: OBJECT_ID, ref: 'Book' }]
});

USER_SCHEMA.method({
    authenticate: function (password) {
        let hashedPassword = ENCRYPTION.generateHashedPassword(this.salt, password);

        if (hashedPassword === this.password) {
            return true;
        }

        return false;
    }
});

const USER = MONGOOSE.model('User', USER_SCHEMA);

module.exports = USER;