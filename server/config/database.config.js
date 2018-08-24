const MONGOOSE = require('mongoose');

MONGOOSE.Promise = global.Promise;

module.exports = (config) => {
    MONGOOSE.connect(config.connectionString);

    let db = MONGOOSE.connection;

    db.once('open', (err) => {
        if (err) {
            throw err;
        }

        console.log('MongoDB is ready!');
    });

    require('../models/Cart');
    require('../models/User');
    require('../models/Role').init();
    require('../models/Receipt');
    require('../models/Book');
    require('../models/Comment');
};