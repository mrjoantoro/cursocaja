const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const currentDate = new Date();
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 3);
                return value <= currentDate && value >= minDate;
            },
            message:
                "The birth date must be less than or equal to the current date and greater than or equal to 3 years ago.",
        },
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    proxies: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Attorney",
            },
        ],
        validate: {
            validator: function (value) {
                return value.length >= 1;
            },
            message: "Must have at least one guardian.",
        },
        required: true,
    },
},{ timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
