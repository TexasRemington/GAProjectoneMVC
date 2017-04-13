// module.exports = function(server){
//   var io = require('socket.io')(server);
//   var Growl = require('../models/growl');
//
//   var sendGrowls = function(socket){
//     Growl.find({}).exec(function(err,growls){
//       if(err) console.log(err);
//       // console.log('Growls: ' growls);
//       io.emit('send growls', growls.reverse().slice(0,12) );
//     });
//   };
//
//   // create a listener
//   io.on('connect', function(socket){
//     sendGrowls(socket);
//
//     socket.on('add growl', function(data){
//       var addGrowl = new Growl({
//         text: data.text,
//         provider: data.provider,
//         image: data.picture,
//         name: data.name
//       });
//
//       addGrowl.save(function(err,growl){
//         if(err) console.log(err);
//
//         sendGrowls(socket);
//       });
//     });
//   });
// };
