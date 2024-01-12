import mongoose from "mongoose";
import { validateRut } from "../../lib/helpers";

const schoolSchema = new mongoose.Schema(
  {
    rut: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateRut,
        message: "Invalid RUT. Please enter a valid RUT.",
      },
    },
    name: {
      type: String,
      required: true,
      minlength: 10,
    },
    address: String,
    commune: String,
    region: String,
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\+56 \d{5} \d{4}$/.test(value);
        },
        message:
          "Invalid phone number format. Please use the format +56 22222 1111.",
      },
      default: "",
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return /\S+@\S+\.\S+/.test(value);
        },
        message:
          "Invalid email format. Please use a valid email format.",
      },
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("School", schoolSchema);
