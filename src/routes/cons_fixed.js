const express = require('express');
const router = express.Router();
const HolidayController = require('../controllers/HolidayControllerFixed');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/c/fixed/', verifyToken, HolidayController.insertCalendarFIXED);
router.put('/c/fixed/', verifyToken, HolidayController.updateCalendarFIXED);
router.delete('/c/fixed/:calendarId', verifyToken, HolidayController.deleteCalendarFIXED);
router.get('/c/fixed/', verifyToken, HolidayController.getCalendarsByOwnerFIXED);
// router.get('/q/free', verifyToken, HolidayController.checkHoliday);
// router.get('/q/work', verifyToken, HolidayController.checkWork);
// router.get('/q/diff', verifyToken, HolidayController.checkHolidayByRegion);

module.exports = router;