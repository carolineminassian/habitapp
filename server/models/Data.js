'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  timestamps: [{
    type: Number
  }] 
});

const Data = mongoose.model('Data', schema);

module.exports = Data;
