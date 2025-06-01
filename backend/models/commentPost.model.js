const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema cho phần reply trong comment
const replySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tag: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  content: {
    type: String,
    required: true,
    trim: true
  }
}, {
    timestamps: true
});

const commentPostSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  tag: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  replies: [replySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('CommentPost', commentPostSchema);
