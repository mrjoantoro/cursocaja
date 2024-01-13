const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/', userController.create);

module.exports = router;
