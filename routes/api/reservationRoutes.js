const express = require("express");
const router = express.Router();
const reservationController = require("../../controllers/reservationController");
const ROLES_LIST = require("../../config/roles_list");
const verifyJWT = require("../../middlewares/verifyJWT");
const verifyRoles = require("../../middlewares/verifyRoles");

router.get("/", verifyJWT, verifyRoles(ROLES_LIST.Admin), reservationController.getAllReservations);
router.get('/pending', verifyJWT, verifyRoles(ROLES_LIST.Admin), reservationController.getPendingReservations);
router.get('/user/:id', verifyJWT, reservationController.getUserReservations);
router.get('/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), reservationController.getReservation);
router.post('/', verifyJWT, reservationController.requestReservation);
router.post('/accept/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), reservationController.acceptReservation);
router.post('/refuse/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), reservationController.refuseReservation);

module.exports = router;