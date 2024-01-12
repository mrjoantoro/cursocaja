const winston = require("winston");
const config = require("../config");

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
    // Aquí se pueden añadir más transports si se desea, como archivos de log, etc.
  ],
});

module.exports = logger;
