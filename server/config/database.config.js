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

    // Seed Imports
    require('../models/Cart');
    require('../models/User');
    require('../models/Role').init();
    require('../models/Book').init();
    require('../models/Comment');

    // Normal Imports
    // require('../models/Cart');
    // require('../models/User');
    // require('../models/Role');
    // require('../models/Book');
    // require('../models/Comment');
};