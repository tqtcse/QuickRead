const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.model');
const Book = require('../models/book.model');
const { verifyToken } = require('../middlewares/authMiddleware');
//api lấy thông tin toàn bộ comment một cuốn sách
// GET /api/comments/book/:bookId
router.get('/book/:bookId', verifyToken, async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // Tìm tất cả comment liên quan đến bookId, populate thông tin user
    const comments = await Comment.find({ book_id: bookId })
      .populate('user_id', 'fullname username avatar_url')  // lấy một số trường của user
      .sort({ createdAt: -1 }); // sắp xếp comment mới nhất lên đầu

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { bookId, rating, text } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating phải từ 1 đến 5' });
    }

    // Validate text
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Nội dung comment không được để trống' });
    }

    // Tạo comment mới
    const newComment = new Comment({
      user_id,
      book_id: bookId,
      rating,
      text,
      like_counts: 0
    });

    await newComment.save();
    const allComments = await Comment.find({ book_id: bookId });

    // Tính lại rating trung bình
    const totalRatings = allComments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRatings / allComments.length;

    // Cập nhật book
    await Book.findByIdAndUpdate(bookId, {
      rating: averageRating.toFixed(2),
      rating_count: allComments.length
    });

    res.status(201).json({ message: 'Comment đã được đăng và cập nhật rating', comment: newComment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/userComment', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const bookId = req.query.bookId;
    const comments = await Comment.find({ user_id, book_id: bookId });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/like', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { commentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.like_counts++;
    await comment.save();
    res.status(200).json({ message: 'Comment liked successfully' });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
})


router.post('/unlike', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { commentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.like_counts--;
    await comment.save();
  } catch (error) {
    console.error('Error unliking comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

router.get('/like', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { commentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment liked successfully' });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;
