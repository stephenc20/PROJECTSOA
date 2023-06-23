const express = require('express');
const router = express.Router();
const HolidayController = require('../controllers/HolidayController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/q/free', verifyToken, HolidayController.checkHoliday);
router.get('/q/work', verifyToken, HolidayController.checkWork);
router.get('/q/diff', verifyToken, HolidayController.checkHolidayByRegion);

module.exports = router;
