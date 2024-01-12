const budgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    year: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                const currentYear = new Date().getFullYear();
                return value >= currentYear;
            },
            message: "The year cannot be in the past",
        },
    },
    type: {
        type: String,
        enum: ["Gastos", "Ingresos"],
        required: true,
    },
    activities: [
        {
            name: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
                validate: {
                    validator: function (value) {
                        const currentDate = new Date();
                        return value > currentDate;
                    },
                    message: "The budget date must be in the future",
                },
            },
            amount: {
                type: Number,
                required: true,
            },
            approved: {
                type: Boolean,
                default: false,
            },
        },
    ],
});
