require('dotenv').config({ silent: true });

var mongoose = require('mongoose');
mongoose.connect(process.env.PROJONE_DB_CONN);

var Shelter = require('./models/shelter');

var shelterData = [
  { name: 'AustinShelter' },
  { name: 'BudaShelter' },
  { name: 'SanMarcosShelter' }
];

Shelter.create(shelterData, function(err, shelters) {
  if (err) {
    console.log('Database Error: ', err);
  }

  console.log('Shelters inserted: ', shelters);
  process.exit();
});
