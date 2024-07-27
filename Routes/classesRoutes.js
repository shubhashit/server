const express = require('express');
const router = express.Router();
const { getCurrentattendence } = require('../Controllers/attendenceController');
const { setAttendence } = require('../Controllers/setAttendenceController');

router.post('/getCuurent' , getCurrentattendence);
router.post('/setCurrent', setAttendence);

module.exports = router;
