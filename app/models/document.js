'use strict'

var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
  type: String,
  visitNumber: {type: Number, required: true},
  carrier: String,
  body: String,
  created: {type: Date, default: Date.now},
  updated: Date,
  author: String
});

// var ImageSchema = new Mongoose.Schema({
//   url : { type : String}, 
//   created : { type : Date, default : Date.now }
// }); 
// var Image = db.model('images', ImageSchema);

// var UserSchema = new Mongoose.Schema({
//   username : { type : String }, 
//   image : [ImageSchema]
// });

// var User = db.model('users', UserSchema);

// var Group = new Mongoose.Schema({ 
//   users : [{ type : Mongoose.Schema.ObjectId, ref : 'users' }]
// });

// Group.
//   find({}).
//   populate('user').
//   exec(function(error, groups) {
//     groups[0].users[0].image.created; // Date associated with image
//   });

module.exports = mongoose.model('Document', documentSchema);
