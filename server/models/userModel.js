const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    enum: ["male", "female"]
  },
  bio: {
    type: String,
    default: 'Available',
  },
  profilePic: {
    type: String,
    default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  status: {
    type: String,
    enum: ['online', 'offline', 'busy'],
    default: 'offline',
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
