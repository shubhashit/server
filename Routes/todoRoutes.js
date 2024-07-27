const express = require('express');
const { updateItems } = require('../Controllers/todoController');
const router = express.Router();
const {getItems} = require('../Controllers/todoGetController');


router.post('/update', updateItems);
router.post('/getall' , getItems)

module.exports = router;
