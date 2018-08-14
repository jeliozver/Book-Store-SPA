const MONGOOSE = require('mongoose');

const STRING = MONGOOSE.Schema.Types.String;
const DATE = MONGOOSE.Schema.Types.Date;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const COMMENT_SCHEMA = MONGOOSE.Schema({
    user: { type: OBJECT_ID, ref: 'User' },
    book: { type: OBJECT_ID, ref: 'Book' },
    content: { type: STRING, required: true },
    creationDate: { type: DATE, default: Date.now }
});

const COMMENT = MONGOOSE.model('Comment', COMMENT_SCHEMA);

module.exports = COMMENT;