const BODY_PARSER = require('body-parser');
const CORS = require('cors');
const PASSPORT = require('passport');

const REGISTER_STRATEGY = require('./passport').localRegister();
const LOGIN_STRATEGY = require('./passport').localLogin();

module.exports = (APP) => {
    APP.use(BODY_PARSER.urlencoded({ extended: true }));
    APP.use(BODY_PARSER.json());
    APP.use(CORS());
    APP.use(PASSPORT.initialize());
    PASSPORT.use('local-register', REGISTER_STRATEGY);
    PASSPORT.use('local-login', LOGIN_STRATEGY);
};