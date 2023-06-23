const express = require('express');
const router = express.Router();
// const HolidayController = require('../controllers/HolidayController');
const AuthController = require('../controllers/AuthController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.put('/a/upgrade', AuthController.upgradeAccount);
router.get('/a/data', verifyToken, AuthController.checkUserData);
router.post('/a/topup', verifyToken, AuthController.addBalance);

// router.get('/q/free', verifyToken, HolidayController.checkHoliday);
// router.get('/q/work', verifyToken, HolidayController.checkWork);
// router.get('/q/diff', verifyToken, HolidayController.checkHolidayByRegion);




module.exports = router;


