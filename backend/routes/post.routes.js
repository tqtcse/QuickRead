const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const Post = require('../models/post.model');
const User = require('../models/user.model');

// API tạo 1 bài post
router.post('/create', verifyToken, async (req, res) => {
    try {
      const { userId, content, image, tag } = req.body;
  
      if (!userId || !content || !image) {
        return res.status(400).json({ message: 'Thiếu thông tin yêu cầu' });
      }
  
      const newPost = new Post({
        userId,
        content,
        image: image,
        tag: tag || []
      });
  
      const savedPost = await newPost.save();
      return res.status(201).json({ message: 'Tạo bài viết thành công', post: savedPost });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  });
  
// API khi like 1 bài post
router.post('/:postId/like', async (req, res) => {
    try {
      const { userId } = req.body;
      const { postId } = req.params;
  
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: 'Post không tồn tại' });
  
      const alreadyLiked = post.like.includes(userId);
  
      if (alreadyLiked) {
        // Unlike
        post.like.pull(userId);
        await post.save();
        return res.status(200).json({ message: 'Đã bỏ like', likes: post.like.length });
      } else {
        // Like
        post.like.push(userId);
        await post.save();
        return res.status(200).json({ message: 'Đã like bài viết', likes: post.like.length });
      }
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  });


router.get('/:postId/like-list', async (req, res) => {
    try {
      const { postId } = req.params;
  
      const post = await Post.findById(postId).populate({
        path: 'like',
        select: 'username avatar_url'
      });
  
      if (!post) return res.status(404).json({ message: 'Post không tồn tại' });
  
      return res.status(200).json({
        totalLikes: post.like.length,
        users: post.like
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  });

  module.exports = router;