const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.authenticateUser);
router.put('/:id', authenticate, userController.updateUser);

module.exports = router;
