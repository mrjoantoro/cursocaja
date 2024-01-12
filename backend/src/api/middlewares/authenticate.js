const jwt = require("jsonwebtoken");
const config = require("../../config");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado." });
  }

  try {
    const verified = jwt.verify(token, config.jwt.secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = authenticate;
