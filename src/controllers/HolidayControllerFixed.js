const {
    HolidayAPI
} = require('holidayapi');
const {
    User
} = require('../models/user');
const {
    Calendar2
} = require('../models/Calendarfixed');
const Joi = require('joi');



exports.insertCalendarFIXED = async (req, res) => {
    const {
        email,
        date,
        type,
        information
    } = req.body;

    // Validasi input menggunakan Joi
    const schema = Joi.object({
        email: Joi.string().email().required(),
        date: Joi.date().iso().required(),
        type: Joi.string().valid('LIBUR', 'KERJA').required(),
        information: Joi.string().required(),
    });

    const {
        error
    } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Menyimpan data kalender ke dalam database
        const calendar = await Calendar2.create({
            owner: user.id, // Use email as owner
            date,
            type,
            information,
        });

        // Retrieve the created calendar with the owner's email
        const createdCalendar = await Calendar2.findOne({
            where: {
                id: calendar.id
            },
            include: [{
                model: User,
                attributes: ['email']
            }],
        });

        res.json({
            message: 'Data kalender berhasil disimpan',
            calendar: createdCalendar,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateCalendarFIXED = async (req, res) => {
    const {
        calendarId,
        email,
        date,
        type,
        information
    } = req.body;

    // Validasi input menggunakan Joi
    const schema = Joi.object({
        calendarId: Joi.number().required(),
        email: Joi.string().email().required(),
        date: Joi.date().iso().required(),
        type: Joi.string().valid('LIBUR', 'KERJA').required(),
        information: Joi.string().required(),
    });

    const {
        error
    } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Cari kalender berdasarkan calendarId
        const calendar = await Calendar2.findOne({
            where: {
                id: calendarId
            }
        });

        if (!calendar) {
            return res.status(404).json({
                message: 'Calendar not found'
            });
        }

        // Perbarui data kalender
        calendar.owner = user.id;
        calendar.date = date;
        calendar.type = type;
        calendar.information = information;
        await calendar.save();

        res.json({
            message: 'Data kalender berhasil diperbarui',
            calendar,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteCalendarFIXED = async (req, res) => {
    const {
        calendarId
    } = req.params;

    try {
        // Cari kalender berdasarkan calendarId
        const calendar = await Calendar2.findOne({
            where: {
                id: calendarId
            }
        });

        if (!calendar) {
            return res.status(404).json({
                message: 'Calendar not found'
            });
        }

        // Hapus kalender
        await calendar.destroy();

        res.json({
            message: 'Data kalender berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getCalendarsByOwnerFIXED = async (req, res) => {
    const {
        email
    } = req.body;

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Cari semua kalender yang dimiliki oleh user berdasarkan owner ID
        const calendars = await Calendar2.findAll({
            where: {
                owner: user.id
            }
        });

        res.json({
            message: 'Data kalender berhasil ditemukan',
            calendars,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};