const MONGOOSE = require('mongoose');

const STRING = MONGOOSE.Schema.Types.String;
const NUMBER = MONGOOSE.Schema.Types.Number;

const BOOK_SCHEMA = MONGOOSE.Schema({
    title: { type: STRING, required: true },
    author: { type: STRING, required: true },
    genre: { type: STRING, required: true },
    description: { type: STRING, required: true },
    cover: { type: STRING, required: true },
    isbn: { type: STRING, required: true },
    publisher: { type: STRING, required: true },
    pagesCount: { type: STRING, required: true },
    price: { type: NUMBER, required: true },
    rating: { type: NUMBER, default: 0 },
    ratedCount: { type: NUMBER, default: 0 },
    purchaseCount: { type: NUMBER, default: 0 }
});

const BOOK = MONGOOSE.model('Book', BOOK_SCHEMA);

module.exports = BOOK;

module.exports.init = () => {
    // TODO
    // Seed some books
};