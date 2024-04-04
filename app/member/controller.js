const Member = require('./model');
const Book = require('../book/model');
const Borrowing = require('../borrow/model');
const Penalty = require('../penalty/model');
const moment = require('moment');

async function borrowBook(req, res) {
    try {
        const { memberId, bookId } = req.body;

        const member = await Member.findById(memberId).populate('borrowings');

        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        const borrowedBooksCount = await Borrowing.countDocuments({ member: memberId });

        if (borrowedBooksCount >= 2) {
            return res.status(400).json({ message: "Member cannot borrow more than 2 books" });
        }


        const book = await Book.findById(bookId);
        if (!book || book.stock <= 0) {
            return res.status(400).json({ message: "Book is not available for borrowing" });
        }

        const borrowedBook = await Borrowing.findOne({ book: bookId });
        if (borrowedBook) {
            return res.status(400).json({ message: "Book is already borrowed by another member" });
        }

        const penalty = await Penalty.findOne({ member: memberId });
        if (penalty) {
            const endDate = moment(penalty.endDate);
            const currentDate = moment();
            const daysUntilPenaltyEnds = endDate.diff(currentDate, 'days');
            if (daysUntilPenaltyEnds > 0 && daysUntilPenaltyEnds <= 3) {
                return res.status(400).json({ message: `Member is currently penalized and cannot borrow books. Penalty ends in ${daysUntilPenaltyEnds} days.` });
            }
        }

        const borrowing = new Borrowing({
            member: memberId,
            book: bookId,
            borrowedDate: new Date()
        });
        await borrowing.save();

        // Decrease book stock
        book.stock--;
        await book.save();

        res.status(201).json(borrowing);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const returnBook = async (req, res) => {
    try {
        const { memberId, bookId } = req.body;

        const member = await Member.findById(memberId).populate('borrowings');
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        const borrowing = await Borrowing.findOne({ member: memberId, book: bookId });
        if (!borrowing) {
            return res.status(400).json({ message: "The book is not borrowed by the member" });
        }

        const borrowedDate = moment(borrowing.borrowedDate);
        const currentDate = moment();
        const daysBorrowed = currentDate.diff(borrowedDate, 'days');

        if (daysBorrowed > 7) {
            const penalty = new Penalty({
                member: memberId,
                penaltyDate: new Date(),
                endDate: moment().add(3, 'days').toDate()
            });
            await penalty.save();

            await Borrowing.deleteOne({ _id: borrowing._id });

            const book = await Book.findById(bookId);
            if (book) {
                book.stock++;
                await book.save();
            }

            return res.status(400).json({ message: "Book returned after more than 7 days. Penalty applied." });
        }

        await Borrowing.deleteOne({ _id: borrowing._id });

        const book = await Book.findById(bookId);
        if (book) {
            book.stock++;
            await book.save();
        }

        const hasPenalty = await Penalty.exists({ member: memberId });
        if (hasPenalty) {
            return res.status(400).json({ message: "Member has a penalty and cannot return books" });
        }

        res.status(200).json({ message: "Book returned successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();

        const membersWithBorrowedBooks = [];

        for (const member of members) {
            const borrowedBooksCount = await Borrowing.countDocuments({ member: member._id });

            const memberWithBorrowedBooks = {
                _id: member._id,
                name: member.name,
                email: member.email,
                borrowedBooksCount: borrowedBooksCount
            };

            membersWithBorrowedBooks.push(memberWithBorrowedBooks);
        }

        res.status(200).json(membersWithBorrowedBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { borrowBook, returnBook, getAllMembers };
