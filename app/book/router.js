const router = require('express').Router();
const bookController = require('./controller');

router.get('/books', bookController.getAllBooks);

module.exports = router;
