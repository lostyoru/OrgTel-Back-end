const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    door: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
        default:"https://res.cloudinary.com/dekmr7qlp/image/upload/v1702662380/hotelroom_t9k4d3.png"
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation'
    }]
});

module.exports = mongoose.model('Room', RoomSchema);