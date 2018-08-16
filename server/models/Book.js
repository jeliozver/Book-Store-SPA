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
    purchasesCount: { type: NUMBER, default: 0 },
    comments: [{ type: OBJECT_ID, ref: 'Comment' }]
});

const BOOK = MONGOOSE.model('Book', BOOK_SCHEMA);

module.exports = BOOK;

module.exports.init = () => {
    BOOK.findOne({ title: 'The Final Empire (Mistborn #1)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'The Final Empire (Mistborn #1)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2006',
                description: 'For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the "Sliver of Infinity," reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler\'s most hellish prison. Kelsier "snapped" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark.',
                cover: 'https://i.imgur.com/VRtPMP2.jpg',
                isbn: '0-765-31178-X',
                pagesCount: '541',
                price: '5.75'
            });
        }
    });
};