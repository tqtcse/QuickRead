const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, maxlength: 100 },
  username: { type: String, maxlength: 50, unique: true },
  email: { type: String, maxlength: 100, required: true, unique: true },
  phone_number: { type: String, maxlength: 20 },
  date_of_birth: { type: Date },
  address: { type: String, maxlength: 255 },
  avatar_url: { type: String, maxlength: 255 },
  rule: { type: String, enum: ['user', 'admin'], default: 'user' },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  country: { type: String, maxlength: 50 },
  password: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
