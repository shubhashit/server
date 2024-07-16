const express = require('express');
const { updateItems } = require('../Controllers/todoController');
const router = express.Router();

router.post('/update', updateItems);

module.exports = router;
