require('dotenv').config({ silent: true });

var mongoose = require('mongoose');
mongoose.connect(process.env.PROJONE_DB_CONN);

var Animal = require('./models/animal');

var animalData = [
  {
    name: 'Rosco',
    description: 'Rosco is a dog',
    breed: 'Lab',
    imageUrl: 'http://vignette1.wikia.nocookie.net/starcraft/images/4/47/Marine_SC2_Icon1.jpg/revision/latest?cb=20160107022344',
    shelter: '58eab6c7b057f6b916f710bf'
  },
  {
    name: 'Ben',
    description: 'Ben is a cat dog',
    breed: 'cat dog',
    imageUrl: 'http://vignette1.wikia.nocookie.net/starcraft/images/4/47/Marine_SC2_Icon1.jpg/revision/latest?cb=20160107022344',
    shelter: '58eab6c7b057f6b916f710c0'
  }

];

Animal.remove({}, function(err, removed) {
  if (err) {
    console.log('Database Error: ', err);
  }

  Animal.create(animalData, function(err, animals) {
    if (err) {
      console.log('Database Error: ', err);
    }

    console.log('Animals inserted: ', animals);
    process.exit();
  });
});
