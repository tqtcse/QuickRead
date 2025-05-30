const mongoose = require('mongoose');


const uri = 'mongodb+srv://QuickReadAdmin:admin1234@quickreaddb.vfh6aoi.mongodb.net/?retryWrites=true&w=majority&appName=QuickReadDB';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;