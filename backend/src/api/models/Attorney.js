const mongoose = require('mongoose');
const user = require('./User');

const attorneySchema = User.discriminator('Attorney', new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    relationshipWithStudent: {
        type: String,
        enum: ['Padre', 'Madre', 'Abuelo', 'Abuela'],
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    parentCenter: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParentCenter'
    }]
}, { timestamps: true });

const Attorney = mongoose.model('Attorney', attorneySchema);

module.exports = Attorney;
