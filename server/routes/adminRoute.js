const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login } = require('../controllers/adminController');
const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware.js');

// Admin routes
router.post('/login', login);
router.get('/users', authenticateJWT, isAdmin, getAllUsers);
// router.get('/users', getAllUsers);
router.get('/users/:userId', authenticateJWT, isAdmin, getUserById);
// router.get('/users/:userId', getUserById);
router.post('/users', authenticateJWT, isAdmin, createUser);
router.put('/users/:userId', authenticateJWT, isAdmin, updateUser);
router.delete('/users/:userId', authenticateJWT, isAdmin, deleteUser);
// router.delete('/users/:userId', deleteUser);

module.exports = router;
