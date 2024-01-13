const logger = require('../../lib/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.message);

    res.status(err.status || 500).json({
        error: {
            message: err.message || 'An internal error occurred.'
        }
    });
};

module.exports = errorHandler;
