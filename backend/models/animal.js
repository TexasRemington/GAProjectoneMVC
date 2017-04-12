var mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;

var animalSchema = new mongoose.Schema({
  name: {type: String, required: true},
  species: {type: String, required: true},
  breed: {type: String, required: true},
  size: {type: String, required: true},
  gender: {type: String, required: true},
  hairType: {type: String, required: true},
  family: {type: String},
  energyLevel: {type: String, required: true},
  trainingNeeds: {type: String, required: true},
  dependency: {type: String, required: true},
  hypoallergenic: {type: String, required: true},
  imageUrl: {type: String, required: true},
  shelter: {type: ObjectId, required: true},
});

var Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
