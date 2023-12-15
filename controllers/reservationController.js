const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Room = require('../models/Room');
const { sendTemplateEmail } = require('../utils/sendEmail');

async function getAllReservations(req, res) {
    try {
        const reservations = await Reservation.find()
            .populate('user')
            .populate('room')
            .exec();
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getPendingReservations(req, res) {
    try {
        const reservations = await Reservation.find({ isPending: true })
            .populate('user')
            .populate('room')
            .exec();
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getUserReservations(req, res) {
    try {
        const user = await User.findById(req.params.id).populate("reservations");
        if(req.user != user.username && !Object.values(req.roles).includes(2002)){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        return res.status(200).json(user.reservations);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getReservation(req, res) {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('user')
            .populate('room')
            .exec();
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        return res.status(200).json(reservation);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function requestReservation(req, res) {
    try {
        const user = await User.findOne({ username: req.user } );
        const room = await Room.findOne({ _id: req.body.room });
        const reservation = new Reservation({
            user: req.user._id,
            room: room.id,
            date: new Date().toISOString(),
            duration: req.body.duration,
            debutDate: req.body.debutDate,
            endDate: req.body.endDate,
        });
        reservation.user = user._id;
        user.reservations.push(reservation._id);
        room.reservations.push(reservation._id);
        await reservation.save();
        await user.save();
        await room.save();
        const Fullname = user.firstname + " " + user.lastname;
        const result = await Room.findOne({ _id: req.body.room });
        const floor = result.floor;
        const roomDoor = result.door;
        sendTemplateEmail("lotfi.brs.br@gmail.com","Reservation request","reservation-request",{
            ...reservation,
            roomDoor,
            Fullname,
            floor
        })
        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function acceptReservation(req, res) {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('user').populate('room').exec();
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        reservation.isPending = false;
        reservation.isAccepted = true;
        await reservation.save();
        console.log(reservation.user)
        const user = await User.findById(reservation.user._id);
        const Fullname = user.firstname + " " + user.lastname;
        const result = await Room.findOne({ _id: reservation.room });
        const floor = result.floor;
        const roomDoor = result.door;
        sendTemplateEmail(user.email,"Reservation accepted","Accepte-reservation",{
            ...reservation,
            roomDoor,
            Fullname,
            floor
        })
        return res.status(200).json({ message: 'Reservation accepted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function refuseReservation(req, res ){
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        reservation.isPending = false;
        await reservation.save();
        const user = await User.findById(reservation.user);
        const Fullname = user.firstname + " " + user.lastname;
        const result = await Room.findOne({ _id: reservation.room });
        const floor = result.floor;
        const roomDoor = result.door;
        sendTemplateEmail(user.email,"Reservation refused","refuse-reservation",{
            ...reservation,
            roomDoor,
            Fullname,
            floor
        })
        return res.status(200).json({ message: 'Reservation refused successfully' });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getAllReservations,
    getPendingReservations,
    getReservation,
    requestReservation,
    getUserReservations,
    acceptReservation,
    refuseReservation,
}