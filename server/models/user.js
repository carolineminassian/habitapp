'use strict';

const mongoose = require('mongoose');
import Habit from './Habit';

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String,
    required: true
  },
  points: {
    type: Number, 
    default: 0,
    required: true
  },
  image: {
    type: String,
    default: ''
  }, 
  habits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Habit
  }]
});

const User = mongoose.model('User', schema);

module.exports = User;
