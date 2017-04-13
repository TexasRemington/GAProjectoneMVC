var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String },
  provider: { type: String, required: true },
  user_id: { type: String, required: true}
});

var Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
