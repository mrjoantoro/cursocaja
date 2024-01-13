const mongoose = require("mongoose");
const { validateRut } = require("../../lib/helpers");

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
      required: false,
      default: "",
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: "Invalid email format. Please use a valid email format.",
      },
      required: true,
    },
    website: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return "www." + this.email.split("@")[1];
      },
    },
    subdomain: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        const domain = this.email.split("@")[1];
        return domain.substring(0, domain.lastIndexOf("."));
      },
    },
    tenant: {
      type: String,
      default: function () {
        const subdomain = this.subdomain;
        return subdomain;
      },
    },
  },
  { timestamps: true }
);

const School = mongoose.model("Student", schoolSchema);

module.exports = School;
