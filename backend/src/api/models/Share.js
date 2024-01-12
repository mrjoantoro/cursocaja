const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pendiente', 'Pagado'],
        default: 'Pendiente'
    },
    attorney: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attorney',
        required: true
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
                return budget.tipo === "Ingresos";
              })
              .catch(() => false);
          },
        message: "El budgetStatus debe ser un presupuesto de ingreso válido.",
        },
      },
}, { timestamps: true });

module.exports = mongoose.model('Share', shareSchema);
