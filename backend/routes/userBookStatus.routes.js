const express = require('express');
const router = express.Router();
const UserBookStatus = require('../models/userBookStatus.model');

// POST /api/user-book-status
router.post('/', async (req, res) => {
  try {
    const { user_id, book_id, status } = req.body;

    if (!user_id || !book_id || !status) {
      return res.status(400).json({ message: 'Thiếu user_id, book_id hoặc status' });
    }

    // Kiểm tra đã tồn tại chưa → nếu có thì cập nhật, không thì tạo mới
    let userBookStatus = await UserBookStatus.findOne({ user_id, book_id });

    if (userBookStatus) {
      userBookStatus.status = status;
      await userBookStatus.save();
      return res.status(200).json({ message: 'Cập nhật thành công', data: userBookStatus });
    }

    // Tạo mới
    userBookStatus = new UserBookStatus({ user_id, book_id, status });
    await userBookStatus.save();
    res.status(201).json({ message: 'Tạo mới thành công', data: userBookStatus });
  } catch (error) {
    console.error('Lỗi tạo/cập nhật UserBookStatus:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
