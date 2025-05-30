const express = require('express');
const router = express.Router();
const UserBookStatus = require('../models/userBookStatus.model');
const { verifyToken } = require('../middlewares/authMiddleware');

// POST /api/user-book-status
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, status } = req.body;

    if (!userId || !bookId || !status) {
      return res.status(400).json({ message: 'Thiếu userId, bookId hoặc status' });
    }

    // Kiểm tra đã tồn tại chưa → nếu có thì cập nhật, không thì tạo mới
    let userBookStatus = await UserBookStatus.findOne({ userId, bookId });

    if (userBookStatus) {
      userBookStatus.status = status;
      await userBookStatus.save();
      return res.status(200).json({ message: 'Cập nhật thành công', data: userBookStatus });
    }

    // Tạo mới
    userBookStatus = new UserBookStatus({ userId, bookId, status });
    await userBookStatus.save();
    res.status(201).json({ message: 'Tạo mới thành công', data: userBookStatus });
  } catch (error) {
    console.error('Lỗi tạo/cập nhật UserBookStatus:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});


router.delete('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;
    const userBookStatus = await UserBookStatus.findOne({ userId, bookId });
    if (userBookStatus) {
      await userBookStatus.deleteOne();
      return res.status(200).json({ message: 'Xóa thành công', data: userBookStatus });
    }
    return res.status(404).json({ message: 'Không tìm thấy dữ liệu' });
  } catch (error) {
    console.error('Lỗi xóa UserBookStatus:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
})

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;



    const userBookStatus = await UserBookStatus.find({ userId })
      .sort({ updatedAt: -1 });

    res.status(200).json({
      message: 'Lấy dữ liệu thành công',
      data: userBookStatus
    });
  } catch (error) {
    console.error('Lỗi lấy dữ liệu UserBookStatus:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
