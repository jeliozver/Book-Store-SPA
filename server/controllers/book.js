const VALIDATOR = require('validator');
const BOOK = require('mongoose').model('Book');
const USER = require('mongoose').model('User');

const PAGE_LIMIT = 15;

function validateBookForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
        isFormValid = false;
        errors.title = 'Please provide title.';
    }

    if (!payload || typeof payload.author !== 'string' || payload.author.trim().length === 0) {
        isFormValid = false;
        errors.author = 'Please provide author.';
    }

    if (!payload || typeof payload.genre !== 'string' || payload.genre.trim().length === 0) {
        isFormValid = false;
        errors.genre = 'Please provide genre.';
    }

    if (!payload || isNaN(Number(payload.year))) {
        isFormValid = false;
        errors.year = 'Please provide book release year.';
    }

    if (!payload || typeof payload.description !== 'string' || payload.description.trim().length < 10) {
        isFormValid = false;
        errors.description = 'Description must be at least 10 symbols long.';
    }

    if (!payload || !payload.cover || !VALIDATOR.isURL(payload.cover)) {
        isFormValid = false;
        errors.cover = 'Please provide proper url for the book\'s cover';
    }

    if (!payload || !payload.isbn || !VALIDATOR.isISBN(payload.isbn)) {
        isFormValid = false;
        errors.isbn = 'Please provide a valid ISBN.';
    }

    if (!payload || isNaN(Number(payload.pagesCount)) || payload.pagesCount === '') {
        isFormValid = false;
        errors.pagesCount = 'Please provide number of pages.';
    }

    if (!payload || isNaN(Number(payload.price)) || Number(payload.price) < 0 || payload.pagesCount === '') {
        isFormValid = false;
        errors.price = 'Please provide book price.';
    }

    return {
        success: isFormValid,
        errors
    };
}

function validateRatingForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (
        !payload
        || isNaN(Number(payload.rating))
        || !VALIDATOR.isInt(payload.rating.toString())
        || Number(payload.rating) < 1
        || Number(payload.rating) > 5
    ) {
        isFormValid = false;
        errors.price = 'Rating must be a integer number between 1 and 5.';
    }

    return {
        success: isFormValid,
        errors
    };
}

module.exports = {
    getSingle: (req, res) => {
        let bookId = req.params.bookId;

        BOOK.findById(bookId)
            .then((book) => {
                if (!book) {
                    return res.status(400).json({
                        message: 'There is no book with the given id in our database.'
                    });
                }

                return res.status(200).json({
                    message: '',
                    data: book
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    message: 'Something went wrong, please try again.'
                });
            });
    },

    add: (req, res) => {
        let book = req.body;

        let validationResult = validateBookForm(book);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Book form validation failed!',
                errors: validationResult.errors
            });
        }

        BOOK.create(book).then((newBook) => {
            return res.status(200).json({
                message: 'Book created successfully!',
                data: newBook
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    edit: (req, res) => {
        let bookId = req.params.bookId;
        let editedBook = req.body;

        let validationResult = validateBookForm(editedBook);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Book form validation failed!',
                errors: validationResult.errors
            });
        }

        BOOK.findById(bookId).then((book) => {
            if (!book) {
                return res.status(400).json({
                    message: 'There is no book with the given id in our database.'
                });
            }

            book.title = editedBook.title;
            book.author = editedBook.author;
            book.genre = editedBook.genre;
            book.year = editedBook.year;
            book.description = editedBook.description;
            book.cover = editedBook.cover;
            book.isbn = editedBook.isbn;
            book.pagesCount = editedBook.pagesCount;
            book.price = editedBook.price;
            book.save();

            return res.status(200).json({
                message: 'Book edited successfully!',
                data: book
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    delete: (req, res) => {
        let bookId = req.params.bookId;

        BOOK.findByIdAndRemove(bookId).then((deletedBook) => {
            if (!deletedBook) {
                return res.status(400).json({
                    message: 'There is no book with the given id in our database.'
                });
            }

            return res.status(200).json({
                message: 'Book deleted successfully.',
                data: deletedBook
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    rate: (req, res) => {
        let bookId = req.params.bookId;
        let rating = req.body.rating;
        let userId = req.user.id;

        let validationResult = validateRatingForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Rating form validation failed!',
                errors: validationResult.errors
            });
        }

        BOOK.findById(bookId).then((book) => {
            if (!book) {
                return res.status(400).json({
                    message: 'There is no book with the given id in our database.'
                });
            }

            let ratedByIds = book.ratedBy.map((id) => id.toString());
            if (ratedByIds.indexOf(userId) !== -1) {
                return res.status(400).json({
                    message: 'You already rated this book'
                });
            }

            book.ratedBy.push(userId);
            book.ratingPoints += rating;
            book.ratedCount += 1;
            book.currentRating = book.ratingPoints / book.ratedCount;
            book.save();

            return res.status(200).json({
                message: 'You rated the book successfully.',
                data: book
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    addToFavorites: (req, res) => {
        let bookId = req.params.bookId;

        BOOK.findById(bookId).then((book) => {
            if (!book) {
                return res.status(400).json({
                    message: 'There is no book with the given id in our database.'
                });
            }

            USER.findById(req.user.id).then((user) => {

                let booksIds = user.favoriteBooks.map((b) => b.toString());
                if (booksIds.indexOf(bookId) !== -1) {
                    return res.status(400).json({
                        message: 'You already have this book in your favorites list'
                    });
                }

                user.favoriteBooks.push(book._id);
                user.save();

                return res.status(200).json({
                    message: 'Successfully added the book to your favorites list.'
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    search: (req, res) => {
        let params = req.query;
        let searchParams = {
            query: {},
            sort: { creationDate: -1 },
            skip: null,
            limit: PAGE_LIMIT,
        };

        if (params.query || typeof params.query === 'string') {
            let query = JSON.parse(params.query);
            searchParams.query = { $text: { $search: query['searchTerm'], $language: 'en' } };
        }

        if (params.sort) {
            searchParams.sort = JSON.parse(params.sort);
        }

        if (params.skip) {
            searchParams.skip = JSON.parse(params.skip);
        }

        if (params.limit) {
            searchParams.limit = JSON.parse(params.limit);
        }

        BOOK
            .find(searchParams.query)
            .count()
            .then((count) => {
                BOOK
                    .find(searchParams.query)
                    .sort(searchParams.sort)
                    .skip(searchParams.skip)
                    .limit(searchParams.limit)
                    .then((result) => {
                        return res.status(200).json({
                            message: '',
                            data: result,
                            query: searchParams,
                            itemsCount: count
                        });
                    })
                    .catch(() => {
                        return res.status(400).json({
                            message: 'Bad Request!'
                        });
                    });
            });
    }
};