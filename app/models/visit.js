'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localArchiveSchema = new Schema({
  author: String,
  document: String,
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
  carrier: [String],
  cob: [String],
  archived: Boolean,
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
