const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, maxlength: 100 },
  username: { type: String, maxlength: 50, unique: true },
  email: {
    type: String, maxlength: 100, required: true, unique: true, trim: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid']
  },
  phone_number: { type: String, maxlength: 20 },
  date_of_birth: { type: Date },
  avatar_url: { type: String },
  rule: { type: String, enum: ['user', 'admin'], default: 'user' },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  password: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
