const Room = require('../models/Room');
const User = require('../models/User');
const Reservation = require('../models/Reservation');

async function getAllRooms(req, res) {
    try {
        const rooms = await Room.find();
        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function reserveAvailableRoom(req, res) {
    try {
        // const result = await Room.create({
        //     name: "hotel chamber",
        //     floor: 4,
        //     door: 48,
        //     price: 1000,
        //     capacity: 3,
        //     category: "657c34d6231743f25fd65332"
        //   })
        console.log('done')
        const username = req.body.username;
        console.log(username);
        const user = await User.findOne({ username });
        console.log(user);
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        if(!room.isAvailable) return res.status(404).json({ message: 'Room not available' });
        const reservation = new Reservation({
            user: user._id,
            room: req.params.id,
            date: new Date().toISOString(),
            duration: req.body.duration,
            debutDate: req.body.debutDate,
            endDate: req.body.endDate,
            isAccepted: true,
            isPending: false
        });
        await reservation.save();
        user.reservations.push(reservation._id);
        await user.save();
        room.reservations.push(reservation._id);
        await room.save();
        return res.status(200).json({ message: 'Room reserved successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllRooms,
    reserveAvailableRoom
}