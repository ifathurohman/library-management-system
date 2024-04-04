const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    borrowings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrowing'
    }]
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
