const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login } = require('../controllers/adminController');
const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware.js');
const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Uploading multer1");
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        console.log("File : ",file);
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  
const upload = multer({ storage: storage });

router.post('/login', login);
router.get('/users', authenticateJWT, isAdmin, getAllUsers);
router.get('/users/:userId', authenticateJWT, isAdmin, getUserById);
router.post('/users', authenticateJWT, isAdmin,upload.single('profilePhoto'), createUser);
router.put('/users/:userId', authenticateJWT, isAdmin,upload.single('profilePhoto'), updateUser);
router.delete('/users/:userId', authenticateJWT, isAdmin, deleteUser);

module.exports = router;
