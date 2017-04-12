var mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;



var animalSchema = new mongoose.Schema({
  name: {type: String, required: true},
  species: {type: String, required: true},
  breed: {type: String, required: true},
  size: {type: String, required: true},
<<<<<<< HEAD
=======
  age: {type: Number, required: true},
>>>>>>> 576ba66473d493a26b1af129aab00dcc7ce981ed
  gender: {type: String, required: true},
  hairType: {type: String, required: true},
  family: {type: String},
  energyLevel: {type: String, required: true},
  trainingNeeds: {type: String, required: true},
  dependency: {type: String, required: true},
  hypoallergenic: {type: String, required: true},
  imageUrl: {type: String, required: true},
<<<<<<< HEAD
  shelter: {type: ObjectId, required: true},
=======
  shelter: {type: ObjectId, required: true}
>>>>>>> 576ba66473d493a26b1af129aab00dcc7ce981ed
});

var Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
