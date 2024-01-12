const { body, validationResult } = require('express-validator');

const validateRegistro = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    // ... otras validaciones
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateRegistro
};
