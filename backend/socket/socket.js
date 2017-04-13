// module.exports = function(server){
//   var io = require('socket.io')(server);
//   var Animal = require('../models/animal');
//
//   var sendAnimals = function(socket){
//     Animal.find({}).exec(function(err,animals){
//       if(err) console.log(err);
//       // console.log('Growls: ' growls);
//       io.emit('send animals', animals.reverse().slice(0,12) );
//     });
//   };
//
//   // create a listener
//   io.on('connect', function(socket){
//     sendAnimals(socket);
//
//     socket.on('add animal', function(data){
//       var addAnimal = new Animal({
//         description: data.description,
//         shelterId: data.shelterId,
//         image: data.picture,
//         name: data.name,
//         animalId: data.animalId
//       });
//
//       addAnimal.save(function(err,animal){
//         if(err) console.log(err);
//
//         sendAnimal(socket);
//       });
//     });
//   });
// };
