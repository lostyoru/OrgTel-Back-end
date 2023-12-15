const express = require('express');
const router = express.Router();

const auth = require('./auth');
const logout = require('./logout');
const refreshToken = require('./refreshToken');
const register = require('./register');

const adminRoutes = require('./api/adminRoutes');
const categoryRoutes = require('./api/categoryRoutes');
const reservationRoutes = require('./api/reservationRoutes');
const roomRoutes = require('./api/roomRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/login', auth);
router.use('/logout', logout);
router.use('/refreshtoken', refreshToken);
router.use('/register', register);

router.use('/admin', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/reservations', reservationRoutes);
router.use('/rooms', roomRoutes);
router.use('/users', userRoutes);

module.exports = router;