const MONGOOSE = require('mongoose');

const STRING = MONGOOSE.Schema.Types.String;
const DATE = MONGOOSE.Schema.Types.Date;
const NUMBER = MONGOOSE.Schema.Types.Number;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const BOOK_SCHEMA = MONGOOSE.Schema({
    title: { type: STRING, required: true },
    author: { type: STRING, required: true },
    genre: { type: STRING, required: true },
    year: { type: NUMBER, required: true },
    description: { type: STRING, required: true },
    cover: { type: STRING, required: true },
    isbn: { type: STRING, required: true },
    pagesCount: { type: NUMBER, required: true },
    price: { type: NUMBER, required: true },
    creationDate: { type: DATE, default: Date.now },
    currentRating: { type: NUMBER, default: 0 },
    ratingPoints: { type: NUMBER, default: 0 },
    ratedCount: { type: NUMBER, default: 0 },
    ratedBy: [{ type: OBJECT_ID, ref: 'User' }],
    purchasesCount: { type: NUMBER, default: 0 },
    comments: [{ type: OBJECT_ID, ref: 'Comment' }]
});

BOOK_SCHEMA.index({
    title: 'text',
    author: 'text',
    genre: 'text',
    isbn: 'text'
});

const BOOK = MONGOOSE.model('Book', BOOK_SCHEMA);

module.exports = BOOK;