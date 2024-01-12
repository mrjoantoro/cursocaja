const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const validateRut = async (value) => {
  const cleanedValue = value.replace(/\D/g, "");
  const length = cleanedValue.length;
  let sum = 0;
  let weight = 2;

  for (let i = length - 1; i >= 0; i--) {
    sum += parseInt(cleanedValue.charAt(i)) * weight;
    weight = weight % 7 === 0 ? 2 : weight + 1;
  }

  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? 0 : 11 - remainder;

  return checkDigit === parseInt(cleanedValue.charAt(length - 1));
};

module.exports = {
  hashPassword,
  validateRut,
};
