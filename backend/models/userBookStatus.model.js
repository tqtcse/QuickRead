const mongoose = require('mongoose');

const userBookStatusSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  status: {
    type: String,
    enum: ['want_to_read', 'reading', 'read'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserBookStatus', userBookStatusSchema);
