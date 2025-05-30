const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  cover_url: {
    type: String,
    trim: true,
    maxlength: 500
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  rating_count: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
