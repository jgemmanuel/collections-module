'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  name: {type: String, trim: true},
  description: {type: String, trim: true},
  number: {type: Number, trim: true}
});

var addressSchema = new Schema({
  department: {type: String, trim: true},
  street: {type: String, trim: true},
  city: {type: String, trim: true},
  state: {type: String, trim: true},
  zip: {type: Number, trim: true}
});

var carrierSchema = new Schema({
  name: {type: String, required: true, unique: true, trim: true},
  description: {type: String, trim: true},
  addresses: [addressSchema],
  nuances: [{type: String, trim: true}],
  providerPortal: {type: String, trim: true},
  contacts: [contactSchema],
  created: {type: Date, author: String, default: Date.now},
  modified: [{type: Date, author: String}]
});

module.exports = mongoose.model('Carrier', carrierSchema);
