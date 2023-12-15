const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    date: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    debutDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isPending: {
        type: Boolean,
        default: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Reservation', ReservationSchema);