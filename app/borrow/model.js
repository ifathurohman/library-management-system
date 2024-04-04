const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Borrowing = mongoose.model('Borrowing', borrowingSchema);

module.exports = Borrowing;
