const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/roomController');
const ROLES_LIST = require('../../config/roles_list');
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');
// verifyJWT, verifyRoles(ROLES_LIST.Admin),
router.get('/', roomController.getAllRooms);
router.post('/reserve/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), roomController.reserveAvailableRoom);

module.exports = router