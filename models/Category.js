const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }]
});

module.exports = mongoose.model('Category', categorySchema);