const express = require('express');
const { createUser } = require('../Controllers/userController');
const router = express.Router();

router.post('/createuser', createUser);

module.exports = router;
