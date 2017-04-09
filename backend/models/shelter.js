var mongoose = require('mongoose');

var shelterSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

var Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;
