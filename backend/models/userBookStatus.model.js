const mongoose = require('mongoose');

const userBookStatusSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['want to read', 'reading', 'read'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserBookStatus', userBookStatusSchema);
