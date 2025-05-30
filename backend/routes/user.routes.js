const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { verifyToken } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'img'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const userId = req.user?.id || 'unknown';
    const folder = path.join(__dirname, '..', 'img');

    // Xoá các file cũ của userId (cùng tên khác đuôi)
    fs.readdir(folder, (err, files) => {
      if (err) {
        console.error('Error reading avatar folder:', err);
        return cb(err, '');
      }

      files.forEach(filename => {
        if (filename.startsWith(userId + '.') && path.extname(filename).toLowerCase() !== ext) {
          fs.unlink(path.join(folder, filename), (err) => {
            if (err) console.error('Failed to delete old avatar:', err);
          });
        }
      });

      cb(null, `${userId}${ext}`);
    });
  }
});

const upload = multer({ storage: storage });

// api lấy thông tin user
// GET /api/users/:id
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Tìm user theo _id
    const user = await User.findById(userId).select('-password'); // loại bỏ trường password khi trả về

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// api update user
// PUT /api/users/:id
router.put('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    console.log("updateData", updateData)
    // Không cho cập nhật password ở đây (hoặc bạn có thể xử lý riêng)
    if (updateData.password) {
      delete updateData.password;
    }

    // Tìm và update user, trả về bản mới nhất sau update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true, context: 'query' }
    ).select('-password'); // loại bỏ password khi trả về

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      fullname,
      username,
      email,
      phone_number,
      date_of_birth,
      address,
      avatar_url,
      rule,
      gender,
      country,
      password
    } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email và password là bắt buộc' });
    }

    // Kiểm tra email hoặc username đã tồn tại chưa
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc username đã được sử dụng' });
    }

    // Tạo user mới
    const newUser = new User({
      fullname,
      username,
      email,
      phone_number,
      date_of_birth,
      address,
      avatar_url,
      rule,
      gender,
      country,
      password // Lưu ý: cần hash password trước khi lưu (ở ví dụ này chưa xử lý)
    });

    await newUser.save();

    // Trả về dữ liệu user (không bao gồm password)
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/upload-avatar', verifyToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user.id;
    const avatarPath = `/img/${req.file.filename}`; // /img/USER_ID.jpg

    // Cập nhật avatar_url trong user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar_url: avatarPath },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Avatar uploaded and updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
