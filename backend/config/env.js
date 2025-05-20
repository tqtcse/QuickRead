require('dotenv').config();
const path = require('path');

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://QuickReadAdmin:admin1234@quickreaddb.vfh6aoi.mongodb.net/?retryWrites=true&w=majority&appName=QuickReadDB',
    SECRET_KEY: process.env.SECRET_KEY || 'your-secret-key',
}
