'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localCarrierSchema = new Schema({
  name: String,
  cob: String,
  claimNumber: {type: String, trim: true},
  eobDate: Date,
  checkNumber: {type: Number, trim: true},
  checkDate: Date
  // paid lines
});

var localArchiveSchema = new Schema({
  author: String,
  document: String,
  created: {type: Date, default: Date.now},
  modified: Date
});

var Comment = new Schema({
  author: String,
  body: String,
  created: {type: Date, default: Date.now},
  modified: Date
});

var visitSchema = new Schema({
  visitNumber: {type: Number, required: true, unique: true, trim: true},
  specimenCode: {type: Number, trim: true},
  billType: String,
  cpt: [{type: String, trim: true}],
  unitCharge: [{type: String, trim: true}],
  status: [String],
  code: [String],
  carrier: [localCarrierSchema],
  archive: [localArchiveSchema],
  comments: [Comment],
  created: {type: Date, default: Date.now},
  modified: [{type: Date, author: String}]
});

// // assign a function to the "statics" object of our animalSchema
// animalSchema.statics.findByName = function (name, cb) {
//   this.find({ name: new RegExp(name, 'i') }, cb);
// }

// var Animal = mongoose.model('Animal', animalSchema);
// Animal.findByName('fido', function (err, animals) {
//   console.log(animals);
// });

module.exports = mongoose.model('Visit', visitSchema);
