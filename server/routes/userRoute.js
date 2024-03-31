const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { register, login, getUserById, editUserById } = require('../controllers/userController.js');
const { authenticateJWT } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination : ",req.file);
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    console.log("req.file : multer ", req.file);
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage })

router.post('/login', login);
router.post('/register',upload.single('profilePhoto'), register);
router.get('/getuser/:userId',authenticateJWT, getUserById); 
router.put('/edituser/:userId',authenticateJWT,upload.single('profilePhoto'), editUserById); 

module.exports = router;
