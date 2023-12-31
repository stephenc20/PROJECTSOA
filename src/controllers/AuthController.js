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
                email: user.email,
                account_type: user.acc_type  
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


exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    const accType = 1; // Set the account type to 1
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser = await User.create({ email, password, acc_type: accType });
  
      res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };




  exports.addBalance = async (req, res) => {
    const { email, amount } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Convert the amount to a numeric value
    const numericAmount = parseInt(amount);

    // Update the user's balance in the database by adding the numeric amount
    const updatedSaldo = user.saldo + numericAmount;
    user.saldo = updatedSaldo;
    await user.save();

    res.json({ message: 'Balance added successfully', saldo: updatedSaldo });
  } catch (error) {
    res.status(500).json({ message: error.message });
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


        if (newAccountType === 2) {
            user.quota = 50;
        }

        await user.save();

        res.json({
            message: 'Account upgraded successfully',
            kuota : user.quota
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