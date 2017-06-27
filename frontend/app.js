$(document).ready(function() {
  console.log('Sanity Check');
  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    }
  });
  var domain = 'http://localhost:5000';
  var paramId = window.location.search.substr(1)
  // var socket = io(domain);
  //
  // socket.on('connect', function(){
  //   console.log('Connected');
  // });
  // What we want to do once we've logged in
  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        // Handle error
        return;
      }
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));
      // Display user information
      show_profile_info(profile);
      checkProfile(profile);
    });
  });
  // retrieve the profile:
  var retrieve_profile = function() {
    var id_token = localStorage.getItem('id_token');
    if (id_token) {
      lock.getProfile(id_token, function (err, profile) {
        if (err) {
          return alert('There was an error getting the profile: ' + err.message);
        }
        // Display user information
        show_profile_info(profile);
      });
    }
  };
  // show profile info once logged in
  var show_profile_info = function(profile) {
     console.log(profile);
     $('.nickname').text(profile.nickname);
     $('.btn-login').hide();
     $('.splash-heading').hide();
     $('.btn-logout').show();
     getGrowlHtml();
     getDetailsHtml();
    //  getGrowlForm();
  };
  // function getGrowlForm(){
  //   $.ajax({
  //     url: '/components/form.json',
  //     method: 'GET'
  //   }).done(function(response){
  //     $('body').prepend(response.html);
  //   }).fail(function(error){
  //     console.error(error);
  //   });
  // };
  //
  // function getGrowlHtml(){
  //   $.ajax({
  //    url: '/browse.html',
  //    method: 'GET'
  //   }).done(function(response){
  //      $('body').prepend(response.html);
  //       addPetLocal();
  //  }).fail(function(error){
  //      console.error(error);
  //    });
  //  };
  //
  //
  var logout = function() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.location.href = "/landing.html";
  };
  function setHandlers(){
    $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.show();
    });
    $('.btn-logout').click(function(e) {
      e.preventDefault();
      logout();
    });
  //   $('body').on('submit','.add-growl',function(e){
  //     e.preventDefault();
  //     var text = $(this).find('.growl').val();
  //     $(this).find('.growl').val('');
  //
  //     addGrowl(text, JSON.parse(localStorage.getItem('profile')) )
  //     $('.class-growls li').last().remove();
  //   });
};
function checkProfile(profile){
  // var data = {
  //   user_id: user_id
  // };
  $.ajax({
    url: domain + '/profiles',
    method: 'GET'
  }).done(function(response){
    var user_ids = [];
    var match = '';
    for(i=0,x=response.length;i<x;i++){
       user_ids.push(response[i].user_id);
    };
    var includes = user_ids.includes(profile.identities[0].user_id);
    console.log('Is profile in DB: ',includes);
      if(includes === true){
      }else{
        addProfile(profile);
      }
  }).fail(function(error){
    console.error('Error: ', error);
  });
};
function addProfile(profile){
  var data = {
    name: profile.given_name + ' ' + profile.family_name,
    picture: profile.picture,
    provider: profile.identities[0].provider,
    user_id: profile.identities[0].user_id
  };
  $.ajax({
    url: domain + '/profiles',
    method: 'POST',
    data: data
  }).done(function(response){
    console.log('Profile was added to the DB! ', response);
    addProfileLocal(response);
  }).fail(function(error){
    console.error('Error: ', error);
  });
  // socket.emit('add profile', data);
};
function addProfileLocal(profile){
  $('.class-profile').prepend([
    '<li>',
      '<p>'+ name +'</p>',
      '<p><img src="'+( image || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg')+'"/></p>',
      '<p>'+provider+'</p>',
    '</li>'
  ].join(''));
};
function quiz(survey){
  var data = {
    q1: survey.species,
    q2: survey.age,
    q3: profile.identities[0].provider,
    q4: profile.identities[0].user_id,
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: ''
  };
  $.ajax({
    url: domain + '/profiles',
    method: 'PATCH',
    data: data
  }).done(function(response){
  }).fail(function(error){
  });
};
   function addPet(animal){
  //  var data = {
  //    name: animal.name,
  //    species: animal.species,
  //    breed: animal.breed,
  //    size: animal.size,
  //    age: animal.age,
  //    gender: animal.gender,
  //    hairType: animal.hairType,
  //    family: animal.family,
  //    energyLevel: animal.energyLevel,
  //    trainingNeeds: animal.trainingNeeds,
  //    dependency: animal.dependency,
  //    hypoallergenic: animal.hypoallergenic,
  //    image: animal.imageUrl,
  //    shelterId: animal.shelterId
  //  };
    //
     $.ajax({
       url: domain + '/animals',
      method: 'GET',
      // data: data
     }).done(function(response){
       // put the growl into the DOM
      console.log('Got all the animals ', response);
addPetLocal(response)
    }).fail(function(error){
       console.error('Error: ', error);
   });
  //   socket.emit('add growl', data);
   };
  //
//   $.ajax({
//     url: domain +'/animals/'+paramId+'/animals',
//    method: 'GET'
//    // data: data
//  }).done(function(response){
//     // put the growl into the DOM
//   console.log('this is the call ', window.location.search.substr(1))
//   console.log('Got the details of  animals ', response);
//
//  }).fail(function(error){
//     console.error('Error: ', error);
// });
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - A D D - D A T A - F R O M - D A T A B A S E - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 //   function addPetLocal(response){
 //     for(var i=0; i<8; i++){
 //     var image = response[i].imageUrl;
 //     var name = response[i].name;
 //     var shelterId = response[i]._id;
 //   $('.thumbnail').prepend([
 //     '<div class="col-sm-3 crop">',
 //    //  '<a href = "/details.html?' +shelterId+ '">',
 //    '<a href = "/details.html?' + shelterId+ '">',
 //     '<img src="'+( image || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg')+'" class="img-responsive browseImg"/>',
 //     '<p>'+ name +'</p>',
 //     '<p>'+ shelterId +'</p>',
 //       '</a>',
 //       '</div>'
 //    ].join(''));
 //  };
 // };

  function main(){
    retrieve_profile();
    setHandlers();
    addPet();
  };
  main();
});
