const express = require('express');
const router = express.Router();
const UserLikeComments = require('../models/userLikeComments.model');
const { verifyToken } = require('../middlewares/authMiddleware');
const Comment = require('../models/comment.model');

router.post('/like', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { commentId } = req.body;
        console.log("commentId", commentId)
        const userLikeComments = await UserLikeComments.findOne({ user_id, comment_id: commentId });
        if (userLikeComments) {
            return res.status(400).json({ message: 'User already liked this comment' });
        }
        const newUserLikeComments = new UserLikeComments({ user_id, comment_id: commentId });
        await newUserLikeComments.save();
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $inc: { like_counts: 1 } },
            { new: true }
        );

        if (!updatedComment) {
            console.log('Comment not found with ID:', commentId);
            return res.status(404).json({ message: 'Comment not found' });
        }

        console.log('Updated Comment:', updatedComment);
        res.status(201).json({ message: 'User liked comment successfully' });
    } catch (error) {
        console.error('Error liking comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


router.post('/unlike', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { commentId } = req.body;
        const userLikeComments = await UserLikeComments.findOne({ user_id, comment_id: commentId });
        if (!userLikeComments) {
            return res.status(400).json({ message: 'User has not liked this comment' });
        }
        await userLikeComments.deleteOne();
        await Comment.findByIdAndUpdate(commentId, { $inc: { like_counts: -1 } });
        res.status(200).json({ message: 'User unliked comment successfully' });
    } catch (error) {
        console.error('Error unliking comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/liked-comments/:bookId', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.id;
        const bookId = req.params.bookId;

        // Lấy tất cả like của user này
        const liked = await UserLikeComments.find({ user_id }).select('comment_id');

        const likedCommentIds = liked.map(like => like.comment_id);

        // Tìm comment có ID nằm trong danh sách đã like và thuộc bookId cụ thể
        const comments = await Comment.find({
            _id: { $in: likedCommentIds },
            book_id: bookId
        });

        res.status(200).json({ likedComments: comments });
    } catch (error) {
        console.error('Error fetching liked comments by book:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// router.get('/like', verifyToken, async (req, res) => {
//   try {
//     const user_id = req.user.id;
//     const { commentId } = req.body;
//   }

// })

module.exports = router;