const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    default: ''
  },
  like_counts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

module.exports = mongoose.model('Comment', commentSchema);
