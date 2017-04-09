var express = require('express');
var router = express.Router();

var Shelter = require('../models/shelter');
var Animal = require('../models/animal');

router.get('/', function(req, res, next) {
  Shelter.find({}, function(err, shelters) {
    if (err) {
      console.log('Database Error:', err);
    }

    console.log('Shelters: ', shelters);

    res.render('shelters/index', {
      shelters: shelters
    });
  });
});

router.get('/:shelterId', function(req, res) {
  Shelter.findById(req.params.shelterId, function(err, shelter) {
    if (err) {
      console.log('err: ', err);
    }

    res.render('shelters/show', {
      shelter: shelter
    });
  });
});

router.get('/:shelterId/animals', function(req, res) {
  Animal.find({ shelter: req.params.shelterId }, function(err, animals) {
    if (err) {
      console.log('Error: ', err);
    }
    console.log('Units: ', animals);

    res.render('shelters/animals', {
      animals: animals
    });
  });
});

router.post('/:shelterId/animals', function(req, res) {
  res.send('save a new animal for this shelter: ' + req.params.shelterId);
  // Redirect to index page for all animals
});

router.get('/:shelterId/animals/new', function(req, res) {
  res.send('display the form for adding a new animal');
});

module.exports = router;
