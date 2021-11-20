'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  category: [
    {
      type: String,
      required: true,
      enum: [
        'fitness',
        'languages',
        'nutrition',
        'organization',
        'relationships',
        'social media',
        'household chores',
        'well-being',
        'work'
      ]
    }
  ],
  tags: [
    {
      type: String,
      enum: [
        'well-being',
        'mental health',
        'fitness',
        'languages',
        'nutrition',
        'gardening',
        'skincare',
        'organization',
        'relationships',
        'social media',
        'household chores',
        'work'
      ]
    }
  ],
  interval: {
    type: Number,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  quantity: {
    type: Number,
    min: 0
  },

  unit: {
    type: String,
    enum: [
      'repetitions',
      'pages',
      'hours',
      'mins',
      'times',
      'l',
      'ml',
      'oz',
      'cm',
      'm',
      'mm',
      'km',
      'inch',
      'miles',
      'glasses',
      'bottles',
      'other'
    ]
  },

  data: [
    {
      type: Number
    }
  ],

  startDate: {
    type: Date,
    required: true
  },

  additionalTags: [
    {
      type: String
    }
  ]
});

const Habit = mongoose.model('Habit', schema);

module.exports = Habit;
