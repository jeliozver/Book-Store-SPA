const MONGOOSE = require('mongoose');

const NUMBER = MONGOOSE.Schema.Types.Number;
const DATE = MONGOOSE.Schema.Types.Date;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const RECEIPT_SCHEMA = MONGOOSE.Schema({
    user: { type: OBJECT_ID, ref: 'User' },
    productsInfo: [],
    totalPrice: { type: NUMBER, default: 0 },
    creationDate: { type: DATE, default: Date.now }
});

const RECEIPT = MONGOOSE.model('Receipt', RECEIPT_SCHEMA);

module.exports = RECEIPT;