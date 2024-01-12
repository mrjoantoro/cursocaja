const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    letter: {
        type: String,
        required: true
    },
    schoolYear: {
        type: Number,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    parentCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParentCenter'
    }
},{ timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
