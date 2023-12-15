const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch(err) {
        console.error(err.message);
    }
}

module.exports = connectDB;