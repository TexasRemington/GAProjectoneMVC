var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');

router.get('/', function(req,res){
  Profile.find({}, function(err, profiles){
    if(err){ console.log(err); }

    res.json(profiles);
  });
});


router.get('/:id',function(req,res,next){
  Profile.find({ _id: req.params.id },function(err,profile){
    if(err){ console.log(err); }

    res.json(profile);
  });
});

/* Add a blog post */
router.post('/',function(req,res,next){

  var newProfile = new Profile({
    name: req.body.name,
    picture: req.body.picture,
    provider: req.body.provider,
    user_id: req.body.user_id
  });

  newProfile.save(function(err, profile){
    if(err){
      res.status(500).send({
        status: 'Error',
        error: err
      });
    } else {
      res.status(200).json({
        status: 'OK',
        profile: profile
      });
    }
  });

});

/* Update a blog post */
router.patch('/',function(req,res,next){
  Profile.findById(req.body.id , function(err,profile){
    if(err) console.log(err);

    profile.name = req.body.name || profile.name;
    profile.picture = req.body.picture || profile.picture;
    profile.provider = req.body.provider || profile.provider;
    profile.user_id = req.body.user_id || profile.user_id;

    profile.save(function(err, profile){
      if(err) console.log(err);

      res.json({
        status: 'updated!',
        updated_profile: profile
      });
    });

  });
});


/* Delete a blog post */
router.delete('/',function(req,res,next){

  Profile.findByIdAndRemove(req.body.id,function(err, profile){
    if(err) console.log(err);
    res.json({
      status: 'deleted!',
      profile: profile
    });
  });

});

module.exports = router;
