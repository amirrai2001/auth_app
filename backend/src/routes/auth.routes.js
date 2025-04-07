// src/routes/auth.routes.js
const express = require('express');
const { register, login, getCurrentUser, logout} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);
router.get('/logout', logout)

module.exports = router;