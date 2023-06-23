const { HolidayAPI } = require('holidayapi');
const { User } = require('../models/user');
const { Calendar } = require('../models/Calendardynamic');
const Joi = require('joi');

exports.insertCalendar = async (req, res) => {
  const { email, dateStart, dateEnd, type, information } = req.body;

  // Validasi input menggunakan Joi
  const schema = Joi.object({
    email: Joi.string().email().required(),
    dateStart: Joi.date().iso().required(),
    dateEnd: Joi.date().iso().required(),
    type: Joi.string().valid('LIBUR', 'KERJA').required(),
    information: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const key = '495c3676-6c0a-4980-aa30-e07c5ac1e145';
  const holidayApi = new HolidayAPI({ key });

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Menyimpan data kalender ke dalam database
    const calendar = await Calendar.create({
      owner: user.id, // Use email as owner
      dateStart,
      dateEnd,
      type,
      information,
    });

    // Retrieve the created calendar with the owner's email
    const createdCalendar = await Calendar.findOne({
      where: { id: calendar.id },
      include: [{ model: User, attributes: ['email'] }],
    });

    res.json({
      message: 'Data kalender berhasil disimpan',
      calendar: createdCalendar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCalendar = async (req, res) => {
  const { calendarId, email, dateStart, dateEnd, type, information } = req.body;

  // Validasi input menggunakan Joi
  const schema = Joi.object({
    calendarId: Joi.number().required(),
    email: Joi.string().email().required(),
    dateStart: Joi.date().iso().required(),
    dateEnd: Joi.date().iso().required(),
    type: Joi.string().valid('LIBUR', 'KERJA').required(),
    information: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cari kalender berdasarkan calendarId
    const calendar = await Calendar.findOne({ where: { id: calendarId } });

    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }

    // Perbarui data kalender
    calendar.owner = user.id;
    calendar.dateStart = dateStart;
    calendar.dateEnd = dateEnd;
    calendar.type = type;
    calendar.information = information;
    await calendar.save();

    res.json({
      message: 'Data kalender berhasil diperbarui',
      calendar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCalendar = async (req, res) => {
  const { calendarId } = req.params;

  try {
    // Cari kalender berdasarkan calendarId
    const calendar = await Calendar.findOne({ where: { id: calendarId } });

    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }

    // Hapus kalender
    await calendar.destroy();

    res.json({ message: 'Data kalender berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCalendarsByOwner = async (req, res) => {
  const { email } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cari semua kalender yang dimiliki oleh user berdasarkan owner ID
    const calendars = await Calendar.findAll({ where: { owner: user.id }});

    res.json({
      message: 'Data kalender berhasil ditemukan',
      calendars,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.checkHoliday = async (req, res) => {
  const { day, month } = req.body;
  const key = '495c3676-6c0a-4980-aa30-e07c5ac1e145';
  const holidayApi = new HolidayAPI({ key });

  const { email } = req;

  try {
    const response = await holidayApi.holidays({
      country: 'ID',
      day,
      month,
      year: '2022',
    });

    const holidays = response.holidays.map(holiday => ({
        user : `Selamat Datang ${email}`,
        day : holiday.day,
        name: holiday.name,
        date: holiday.date,
    }));

    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.checkWork = async (req, res) => {
  const { day, month } = req.body;
  const key = '495c3676-6c0a-4980-aa30-e07c5ac1e145';
  const holidayApi = new HolidayAPI({ key });
  const year = '2022';

  try {
    const holidayResponse = await holidayApi.holidays({
      country: 'ID',
      day,
      month,
      year,
    });

    const isHoliday = holidayResponse.holidays.length > 0;
    const message = isHoliday ? 'Hari ini adalah hari libur' : 'Hari ini adalah hari kerja';
    const { email } = req;

    const responseData = { user: `Selamat Datang, ${email}`, day, month, year, message };
    
    if (isHoliday) {
      responseData.holidays = holidayResponse.holidays.map(holiday => holiday.name);
    }

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.checkHolidayByRegion = async (req, res) => {
  const { day, month,country } = req.body;
  const key = '495c3676-6c0a-4980-aa30-e07c5ac1e145';
  const holidayApi = new HolidayAPI({ key });

  try {
    const response = await holidayApi.holidays({
      country,
      day,
      month,
      year: '2022',
    });

    const holidays = response.holidays.map(holiday => ({
        day : holiday.day,
        name: holiday.name,
        date: holiday.date,
    }));

    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


