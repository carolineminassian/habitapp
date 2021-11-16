'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'fitness',
      'languages',
      'nutrition',
      'organization',
      'relationships',
      'social media',
      'work'
    ]
  },
  tags: [
    {
      type: String,
      enum: [
        'well-being',
        'mental health',
        'fitness',
        'languages',
        'nutrition',
        'organization',
        'relationships',
        'social media',
        'work'
      ]
    }
  ],
  interval: {
    type: Number,
    required: true
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      settings: {
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
        }
      },

      data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Data',
        required: true
      },
      streak: {
        type: Number,
        required: true,
        default: 0,
        min: 0
      },
      startDate: {
        type: Date, //save date as millisecond value
        required: true
      },
      additionalTags: [
        {
          type: String
        }
      ]
    }
  ]
});

const Habit = mongoose.model('Habit', schema);

module.exports = Habit;
