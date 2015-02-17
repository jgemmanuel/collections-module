'use strict'

var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
  type: String,
  visitNumber: {type: Number, required: true, unique: true},
  carrier: String,
  created: Date,
  updated: Date
});

module.exports = mongoose.model('Document', documentSchema);
