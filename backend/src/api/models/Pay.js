const mongoose = require('mongoose');

const paySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    datePay: {
        type: Date,
        required: true
    },
    voucher: {
        type: String,
        required: true
    },
    share: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Share',
        required: true
    },
    attorney: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attorney',
        required: true
    }
});

const Pay = mongoose.model('Pay', paySchema);

module.exports = Pay;
