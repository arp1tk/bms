const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,      // Parses MongoDB connection string correctly
            useUnifiedTopology: true,   // Handles connection management for MongoDB driver
            serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds if unable to connect
            socketTimeoutMS: 45000,     // Close sockets after 45 seconds of inactivity
        });
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);  // Exit the process with failure if connection fails
    }
};

module.exports = connectDB;
