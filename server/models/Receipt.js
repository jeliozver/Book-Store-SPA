const MONGOOSE = require('mongoose');

const NUMBER = MONGOOSE.Schema.Types.Number;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const RECEIPT_SCHEMA = MONGOOSE.Schema({
    user: { type: OBJECT_ID, ref: 'User' },
    productsInfo: [],
    totalPrice: { type: NUMBER, default: 0 },
});

const RECEIPT = MONGOOSE.model('Receipt', RECEIPT_SCHEMA);

module.exports = RECEIPT;