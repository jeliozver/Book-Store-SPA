const USER_CONTROLLER = require('../controllers/user');
const BOOK_CONTROLLER = require('../controllers/book');
const COMMENT_CONTROLLER = require('../controllers/comment');
const CART_CONTROLLER = require('../controllers/cart');
const ERROR_CONTROLLER = require('../controllers/error');
const AUTH = require('./auth');

module.exports = (APP) => {
    APP.post('/user/register', USER_CONTROLLER.register);
    APP.post('/user/login', USER_CONTROLLER.login);
    APP.get('/user/profile/:username', AUTH.isAuth, USER_CONTROLLER.getProfile);
    APP.post('/user/blockComments/:username', AUTH.isInRole('Admin'), USER_CONTROLLER.blockComments);
    APP.post('/user/unlockComments/:username', AUTH.isInRole('Admin'), USER_CONTROLLER.unblockComments);

    APP.get('/user/cart', AUTH.isAuth, CART_CONTROLLER.getCart);
    APP.post('/user/cart/add/:bookId', AUTH.isAuth, CART_CONTROLLER.addToCart);
    APP.delete('/user/cart/delete/:bookId', AUTH.isAuth, CART_CONTROLLER.removeFromCart);
    APP.post('/user/cart/checkout', AUTH.isAuth, CART_CONTROLLER.checkout);

    APP.get('/book/:bookId', BOOK_CONTROLLER.getSingle);
    APP.get('/book/search', BOOK_CONTROLLER.search);
    APP.post('/book/add', AUTH.isInRole('Admin'), BOOK_CONTROLLER.add);
    APP.put('/book/edit/:bookId', AUTH.isInRole('Admin'), BOOK_CONTROLLER.edit);
    APP.delete('/book/delete/:bookId', AUTH.isInRole('Admin'), BOOK_CONTROLLER.delete);
    APP.post('/book/rate/:bookId', AUTH.isAuth, BOOK_CONTROLLER.rate);
    APP.post('/book/addToFavorites/:bookId', AUTH.isAuth, BOOK_CONTROLLER.addToFavorites);

    APP.get('/comment/:bookId', COMMENT_CONTROLLER.get);
    APP.post('/comment/add/:bookId', AUTH.isAuth, COMMENT_CONTROLLER.add);
    APP.put('/comment/edit/:commentId', AUTH.isAuth, COMMENT_CONTROLLER.edit);
    APP.delete('/comment/delete/:commentId', AUTH.isAuth, COMMENT_CONTROLLER.delete);

    APP.all('*', ERROR_CONTROLLER.error);
};