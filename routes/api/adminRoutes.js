const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const ROLES_LIST = require('../../config/roles_list');
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');

router.get('/dashboard', verifyJWT, verifyRoles(ROLES_LIST.Admin), adminController.getDashboard);
router.put('/addroles/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), adminController.addRoles);
router.put('/removeroles/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), adminController.removeRoles);
router.put('/addadmin/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), adminController.addAdmin);
router.put('/removeadmin/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), adminController.removeAdmin);

module.exports = router;