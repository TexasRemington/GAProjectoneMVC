 var express = require('express');
 var router = express.Router();
 var Animal = require('../models/animal');

    var animalAtt = new Animal({
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

// /* GET home page. */
 //router.get('/', function(req, res, next) {
//  Animals.find({}).exec(function(err,animals){
//   if(err) console.log(err);
//    res.json(animals.reverse().slice(0,12));
//  });
// });

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

  router.animal('/',function(req,res,next){

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
