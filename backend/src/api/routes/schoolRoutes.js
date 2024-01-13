const express = require("express");
const schoolController = require("../controllers/schoolController");

const router = express.Router();

router.post("/", schoolController.create);

module.exports = router;
