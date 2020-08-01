const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
    default: '',
  },
  email: {
    type: String,
    required: false,
    default: '',
  },
  telephone: {
    type: String,
    required: false,
    default: '',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contato', ContactSchema);

module.exports = Contact;
