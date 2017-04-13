 var express = require('express');
 var router = express.Router();
 var Animal = require('../models/animal');


 router.get('/', function(req, res, next) {
  Animal.find({}, function(err, animals) {
    if (err) {
      console.log('Database Error:', err);
    }
    console.log('Animals: ', animals);

    res.render('shelters/animals', {
    animals: animals
    });
  });
});

router.post('/',function(req,res,next){

  var newAnimal = new Animal({
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    size: req.body.size,
    age: req.body.age,
    gender: req.body.gender,
    hairType: req.body.hairType,
    family: req.body.family,
    energyLevel: req.body.energyLevel,
    trainingNeeds: req.body.trainingNeeds,
    dependency: req.body.dependency,
    hypoallergenic: req.body.hypoallergenic,
    image: req.body.imageUrl,
    shelterId: req.body.shelterId
  });

  newAnimal.save(function(err, animal){
    if(err){
      res.status(500).send({
        status: 'Error',
        error: err
      });
    } else {
      res.status(200).json({
        status: 'saved',
      });
    }
  });
});


  router.patch('/', function(req, res, next){
    Animal.FindById(req.body.id, function(err,animal){
      if(err) console.log(err);

          animal.name = req.body.name || profile.name;
          animal.species = req.body.picture || profile.picture;
          animal.breed = req.body.provider || profile.provider;
          animal.size = req.body.user_id || profile.user_id;
          animal.age = req.body.age || animal.age;
          animal.gender = req.body.gender || animal.gender;
          animal.hairType = req.body.hairType || animal.hairType;
          animal.family = req.body.family || animal.family;
          animal.energyLevel = req.body.energyLevel || animal.energyLevel;
          animal.trainingNeeds = req.body.trainingNeeds || animal.trainingNeeds;
          animal.dependency = req.body.dependency || animal.dependency;
          animal.hypoallergenic = req.body.hypoallergenic || animal.hypoallergenic;
          animal.image = req.body.image || animal.image;
          animal.shelterId = req.body.shelterId || animal.shelterId;

      animal.save(function(err,animal){
        if(err) console.log(err);

      res.json({
        status: 'updated',
        updated_animal: animal
        });
      });
    });
  });

router.delete('/', function(req, res, next){
  Animal.findByIdAndRemove(req.body.id, function(err, animal){
    if(err) console.log(err);
    res.json({
      status: 'animal deleted',
      animal: animal
    });
  });
});
// // Add a growl to the database
 //router.post('/', function(req,res,next){
//  var addAnimal = new Animal({
//     description: req.body.text,
//    shelterId: req.body.shelterId,
  // image: req.body.picture,
     //name: req.body.name,
//     animalId: req.body.animalId
//   });

//   addAnimal.save(function(err,animal){
//    if(err) console.log(err);
//    res.json(animal);
//  });
 //});

 module.exports = router;
