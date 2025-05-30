const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
    }

    const token = authHeader.split(' ')[1]; // tách lấy phần sau "Bearer"


    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verify error:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { verifyToken };
