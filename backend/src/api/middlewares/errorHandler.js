const logger = require('../../lib/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.message);

    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Ocurrió un error interno.'
        }
    });
};

module.exports = errorHandler;
