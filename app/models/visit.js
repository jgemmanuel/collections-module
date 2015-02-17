'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitSchema = new Schema({
  visitNumber: {type: Number, required: true, unique: true},
  carrier: String,
  lines: Schema.Types.Mixed,
  claimNumber: String,
  eobDate: Date,
  checkNumber: Number,
  checkDate: Date,
  created: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
});

module.exports = mongoose.model('Visit', visitSchema);
