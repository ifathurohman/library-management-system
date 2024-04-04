const mongoose = require('mongoose');

const penaltySchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    }
});

const Penalty = mongoose.model('Penalty', penaltySchema);

module.exports = Penalty;
