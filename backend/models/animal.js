var mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;

var animalSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  breed: {type: String, required: true},
  shelter: {type: ObjectId, required: true},
  image: String,
});

var Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
