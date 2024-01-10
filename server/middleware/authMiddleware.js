const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  console.log("authenticateJWT - token : ",token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'myKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    console.log("jwt verify user : ",user);
    req.user = user;
    next();
  });
};

// Admin role check middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};

module.exports = { authenticateJWT, isAdmin };
