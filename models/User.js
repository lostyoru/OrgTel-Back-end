const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required:true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required:true,
        unique: true
    },
    image: {
        type:String,
        default: 'https://res.cloudinary.com/dekmr7qlp/image/upload/v1701910051/default-pfp_uc7yn8.jpg'
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation'
    }],
    roles: {
        User:{
            type: Number,
            default: 2005
        },
        Admin: Number,
        Employee: Number,
    },
    refreshToken: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);