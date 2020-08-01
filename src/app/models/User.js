const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next) {
  const salt = bcrypt.genSaltSync();
  const passwordHash = await bcrypt.hash(this.password, salt);
  this.password = passwordHash;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
