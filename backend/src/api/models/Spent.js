const mongoose = require("mongoose");

const spentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  paymentReceipt: {
    type: String,
    required: true,
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    required: true,
    validate: {
      validator: function (value) {
        return mongoose
          .model("Budget")
          .findById(value)
          .then((budget) => {
            if (!budget) {
              return false;
            }
            return budget.tipo === "Gastos";
          })
          .catch(() => false);
      },
    message: "El budgetStatus debe ser un presupuesto de gasto válido.",
    },
  },
});

const Spent = mongoose.model("Spent", spentSchema);

module.exports = Spent;
