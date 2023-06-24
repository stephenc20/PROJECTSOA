const express = require('express');
const router = express.Router();
const HolidayController = require('../controllers/HolidayController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/q/free', HolidayController.checkHoliday);
router.get('/q/work', HolidayController.checkWork);
router.get('/q/diff',  HolidayController.checkHolidayByRegion);

module.exports = router;
