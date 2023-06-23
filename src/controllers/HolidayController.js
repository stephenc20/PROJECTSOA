const { HolidayAPI } = require('holidayapi');

exports.checkHoliday = async (req, res) => {
  const { day, month } = req.body;
  const key = '495c3676-6c0a-4980-aa30-e07c5ac1e145';
  const holidayApi = new HolidayAPI({ key });

  try {
    const response = await holidayApi.holidays({
      country: 'ID',
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
//
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
