const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid' });
    }

    // Mendapatkan nilai account_type dari token yang terdekripsi
    const { account_type } = decoded;

    // Memeriksa apakah account_type adalah 1 atau 2
    if (account_type !== 2) {
      return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses endpoint ini' });
    }

    req.email = decoded.email;
    next();
  });
};


