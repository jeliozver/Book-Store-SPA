const USER_CONTROLLER = require('../controllers/user');
const BOOK_CONTROLLER = require('../controllers/book');
const ERROR_CONTROLLER = require('../controllers/error');
const AUTH = require('./auth');

module.exports = (APP) => {
    APP.post('/user/register', USER_CONTROLLER.register);
    APP.post('/user/login', USER_CONTROLLER.login);

    APP.all('*', ERROR_CONTROLLER.error);
};