const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');


router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'Tên danh mục là bắt buộc' });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(409).json({ message: 'Danh mục đã tồn tại' });

    const category = new Category({ name });
    await category.save();

    res.status(201).json({ message: 'Tạo danh mục thành công', data: category });
  } catch (error) {
    console.error('Lỗi tạo category:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});




module.exports = router;
