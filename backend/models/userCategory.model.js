const mongoose = require('mongoose');

const userCategorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category_list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('UserCategory', userCategorySchema);
