const jwt = require('jsonwebtoken');

const { User } = require('../models/user');




exports.registerUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.create({
            email,
            password
        });
        res.status(201).json({
            message: 'User berhasil terdaftar',
            userId: user.email
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (user && user.password === password) {
            const token = jwt.sign({
                email: user.email
            }, 'secret_key');
            res.json({
                token
            });
        } else {
            res.status(400).json({
                message: 'Email atau password salah'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
