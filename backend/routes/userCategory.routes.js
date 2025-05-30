const express = require('express');
const router = express.Router();
const UserCategory = require('../models/userCategory.model');
const { verifyToken } = require('../middlewares/authMiddleware');
const Category = require('../models/category.model');
// POST /api/user-categories - Tạo mới hoặc cập nhật
router.post('/', async (req, res) => {
  try {
    const { user_id, category_list } = req.body;

    if (!user_id || !Array.isArray(category_list)) {
      return res.status(400).json({ message: 'Thiếu user_id hoặc category_list không hợp lệ' });
    }

    let userCategory = await UserCategory.findOne({ user_id });

    if (userCategory) {
      userCategory.category_list = category_list;
      await userCategory.save();
      return res.status(200).json({ message: 'Cập nhật thành công', data: userCategory });
    }

    userCategory = new UserCategory({ user_id, category_list });
    await userCategory.save();
    res.status(201).json({ message: 'Tạo mới thành công', data: userCategory });
  } catch (error) {
    console.error('Lỗi tạo/cập nhật UserCategory:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// GET /api/user-categories/:userId
router.get('/', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;


    // Tìm UserCategory theo userId và populate danh sách category
    const userCategories = await UserCategory.findOne({ user_id: user_id }).populate('category_list');

    if (!userCategories) {
      return res.status(404).json({ message: 'Không tìm thấy danh sách category cho user này' });
    }

    res.status(200).json(userCategories.category_list);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách category của user:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

router.put('/', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { category_list } = req.body;
    const categoryDocs = await Category.find({
      name: { $in: category_list }
    });

    const categoryIds = categoryDocs.map(c => c._id);
    const userCategory = await UserCategory.findOne({ user_id });
    if (!userCategory) {
      return res.status(404).json({ message: 'Không tìm thấy danh sách category cho user này' });
    }
    userCategory.category_list = categoryIds;
    await userCategory.save();
    res.status(200).json({ message: 'Cập nhật thành công', data: userCategory });
  } catch (error) {
    console.error('Lỗi khi cập nhật danh sách category của user:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});
module.exports = router;
