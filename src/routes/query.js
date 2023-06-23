const express = require('express');
const router = express.Router();
const HolidayController = require('../controllers/HolidayController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/q/free', verifyToken, HolidayController.checkHoliday);

module.exports = router;
