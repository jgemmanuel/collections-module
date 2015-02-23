'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitSchema = new Schema({
  visitNumber: {
    type: Number,
    required: true,
    unique: false
  },
  specimenCode: Number,
  billType: String,
  cpt: [String],
  unitCharge: [String],
  carrier: [{
    name: String,
    cob: String,
    claimNumber: String,
    eobDate: Date,
    checkNumber: Number,
    checkDate: Date,
  }],
  archive: [{
    author: String,
    document: String,
    created: Date,
    modified: Date
  }],
  comments: [{
    author: String,
    body: String,
    created: Date,
    modified: Date
  }],
  created: {
    type: Date,
    default: Date.now,
  },
  modified: [{
    type: Date,
    author: String
  }]
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
