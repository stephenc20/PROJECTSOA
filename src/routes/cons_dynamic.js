const express = require('express');
const router = express.Router();
const HolidayController = require('../controllers/HolidayController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/c/dynamic/', verifyToken, HolidayController.insertCalendar);
router.put('/c/dynamic/', verifyToken, HolidayController.updateCalendar);
router.delete('/c/dynamic/:calendarId', verifyToken, HolidayController.deleteCalendar);
router.get('/c/dynamic/', verifyToken, HolidayController.getCalendarsByOwner);
// router.get('/q/free', verifyToken, HolidayController.checkHoliday);
// router.get('/q/work', verifyToken, HolidayController.checkWork);
// router.get('/q/diff', verifyToken, HolidayController.checkHolidayByRegion);

module.exports = router;