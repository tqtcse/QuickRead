const express = require('express');
const router = express.Router();
const CommentPost = require('../models/commentPost.model');
const User = require('../models/user.model');
const { verifyToken } = require('../middlewares/authMiddleware');

// POST /api/comment-post/

// Tạo bình luận mới
router.post('/create', verifyToken, async (req, res) => {
    try {
      const userId = req.user.id; // lấy từ token
      const { postId, content, tagUsername } = req.body;
  
      if (!postId || !content) {
        return res.status(400).json({ message: 'postId và content là bắt buộc' });
      }
  
      let tagUserId = null;
  
      // Nếu có username được tag, tìm user
      if (tagUsername) {
        const taggedUser = await User.findOne({ username: tagUsername });
        if (taggedUser) {
          tagUserId = taggedUser._id;
        }
      }
  
      // Tạo bình luận mới
      const newComment = new CommentPost({
        userId,
        postId,
        content,
        tag: tagUserId
      });
  
      await newComment.save();
  
      // Populate userId để trả về thông tin người bình luận
      const populatedComment = await CommentPost.findById(newComment._id)
        .populate('userId', 'username avatar_url')
        .populate('tag', 'username');
  
      res.status(201).json({
        message: 'Bình luận đã được tạo',
        comment: populatedComment
      });
  
    } catch (error) {
      console.error('Lỗi khi tạo bình luận:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  });

// API tạo reply
router.post('/:commentId/reply', verifyToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { commentId } = req.params;
      const { content, tagUsername } = req.body;
  
      if (!content) {
        return res.status(400).json({ message: 'Nội dung reply là bắt buộc.' });
      }
  
      // Kiểm tra comment gốc
      const comment = await CommentPost.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Không tìm thấy bình luận gốc.' });
      }
  
      let tagUserId = null;
  
      // Nếu có người được tag
      if (tagUsername) {
        const taggedUser = await User.findOne({ username: tagUsername });
        if (taggedUser) {
          tagUserId = taggedUser._id;
        }
      }
  
      // Tạo reply object
      const newReply = {
        userId,
        content,
        tag: tagUserId
      };
  
      // Thêm vào replies của comment
      comment.replies.push(newReply);
      await comment.save();
  
      // Lấy comment sau khi cập nhật để trả về
      const updatedComment = await CommentPost.findById(commentId)
        .populate('userId', 'username avatar_url')
        .populate('tag', 'username')
        .populate('replies.userId', 'username avatar_url')
        .populate('replies.tag', 'username');
  
      res.status(201).json({
        message: 'Reply đã được thêm.',
        comment: updatedComment
      });
  
    } catch (error) {
      console.error('Lỗi khi tạo reply:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  });

module.exports = router;