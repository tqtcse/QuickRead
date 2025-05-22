const db = require('../config/db');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { SECRET_KEY } = require('../config/env');

console.log(SECRET_KEY);
const crypto = require('crypto');

const register = async (req, res) => {
    const { username, email, password, confirmPassword, country, date_of_birth, fullname, phone_number, avatar, gender, genres } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Mật khẩu không khớp!' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ message: 'Email hoặc Username đã tồn tại' });
        }

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            country,
            date_of_birth,
            fullname,
            phone_number,
            avatar,
            gender,
        });

        await newUser.save();

        const token = jwt.sign({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            rule: newUser.rule || 'user',
        }, SECRET_KEY, { expiresIn: '24h' });

        return res.status(201).json({
            message: 'Đăng ký thành công',
            token,

        });
    } catch (error) {
        return res.status(500).json({ message: 'Đăng ký thất bại', error: error.message });
    }




}

const login = async (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);
    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    try {
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại' });
        }

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        if (hashedPassword !== user.password) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác' });
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            rule: user.rule || 'user',
        }, SECRET_KEY, { expiresIn: '24h' });

        return res.json({
            message: 'Đăng nhập thành công',
            token,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Đăng nhập thất bại', error: error.message });
    }
};


module.exports = {
    register,
    login,
}
