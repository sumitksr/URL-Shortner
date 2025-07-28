const mongoose = require('mongoose');
require('dotenv').config();

const urlSchema = new mongoose.Schema({
  originalUrl: { 
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
