// userRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { register, login, logout, getUserById } = require('../controllers/userController.js');
const { authenticateJWT } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp and original extension
  },
});

const upload = multer({ storage: storage });

router.post('/login', login);
router.post('/logout', authenticateJWT, logout);
router.post('/register', upload.single('profilePhoto'), register);
router.get('/getUser/:userId', getUserById); // Change the route to use URL parameters

module.exports = router;
