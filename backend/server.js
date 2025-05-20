const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const connectDB = require('./config/db');
const { SERVER_PORT } = require('./config/env');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/api/auth', authRoutes);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});

