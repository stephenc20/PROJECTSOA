const jwt = require('jsonwebtoken');

const {
    User
} = require('../models/user');
const {
    AccountType
} = require('../models/account_type');

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



exports.upgradeAccount = async (req, res) => {
    try {
        const {
            email
        } = req.body;
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

        // Cek apakah saldo mencukupi untuk upgrade
        const requiredBalance = 50000;
        if (user.saldo < requiredBalance) {
            return res.status(400).json({
                message: 'Insufficient balance for upgrade'
            });
        }

        // Ambil data account_type untuk upgrade
        const accountType = await AccountType.findOne({
            where: {
                id: user.acc_type
            }
        });

        if (!accountType) {
            return res.status(404).json({
                message: 'Account type not found'
            });
        }

        // Lakukan proses upgrade
        const newAccountType = 2; // Menentukan account type baru
        user.acc_type = newAccountType;
        user.saldo -= requiredBalance;
        await user.save();

        res.json({
            message: 'Account upgraded successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.checkUserData = async (req, res) => {
    const {
        email
    } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            },
            include: [AccountType] // Sertakan informasi AccountType pada pengguna
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const {
            acc_type,
            quota
        } = user;

        let accountTypeText = '';
        if (acc_type === 1) {
            accountTypeText = 'FREE';
        } else if (acc_type === 2) {
            accountTypeText = 'PREMIUM';
        } else {
            accountTypeText = 'UNKNOWN';
        }

        res.json({
            email: user.email,
            account_type: accountTypeText,
            quota
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};