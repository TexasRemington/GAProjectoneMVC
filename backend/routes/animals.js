 var express = require('express');
 var router = express.Router();
 var Animal = require('../models/animal');

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
