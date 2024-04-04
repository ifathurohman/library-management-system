const Book = require('./model');
const Borrowing = require('../borrow/model');

const getAllBooks = async (req, res, next) => {
  try {

    const borrowedBookCounts = await Borrowing.aggregate([
      { $group: { _id: '$book', count: { $sum: 1 } } }
    ]);

    const allBooks = await Book.find({}, 'title stock');

    const availableBooks = allBooks.filter(book => {
      const borrowedBookCount = borrowedBookCounts.find(count => count._id.toString() === book._id.toString());
      return !borrowedBookCount || borrowedBookCount.count === 0;
    });

    res.json(availableBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { getAllBooks };