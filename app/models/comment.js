'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  visitNumber: Number,
  author: String,
  body: {type: String, trim: true},
  claimNumber: {type: String, trim: true},
  eobDate: Date,
  paymentNumber: {type: String, trim: true},
  paymentDate: Date,
  created: {type: Date, default: Date.now},
  modified: Date
});

module.exports = mongoose.model('Comment', commentSchema);
