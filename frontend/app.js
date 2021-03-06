$(document).ready(function() {

  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    }
  });

  var domain = 'http://localhost:5000';
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

    //  getGrowlHtml();
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
  //     url: '/components/growls.json',
  //     method: 'GET'
  //   }).done(function(response){
  //     $('body').prepend(response.html);
  //     // refreshGrowls();
  //   }).fail(function(error){
  //     console.error(error);
  //   });
  // };



  var logout = function() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.location.href = "/";
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

  // function addPet(animal){
  //   var data = {
  //     name: name,
  //     description: description,
  //     picture: picture,
  //     breed: breed,
  //     shelter: shelterId
  //   };
    //
    // $.ajax({
    //   url: domain + '/growl',
    //   method: 'POST',
    //   data: data
    // }).done(function(response){
    //   // put the growl into the DOM
    //   console.log('Growl was added to the DB! ', response);
    //   addGrowlLocal(response)
    // }).fail(function(error){
    //   console.error('Error: ', error);
    // });

  //   socket.emit('add growl', data);
  // };
  //
  // function addGrowlLocal(growl){
  //   $('.class-growls').prepend([
  //     '<li>',
  //       '<p>'+growl.name+'</p>',
  //       '<p><img src="'+(growl.image || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg')+'"/></p>',
  //       '<p>'+growl.text+'</p>',
  //       '<p>'+growl.provider+'</p>',
  //     '</li>'
  //   ].join(''));
  // };

  // function refreshGrowls(){
  //   $.ajax({
  //     url: domain + '/growl',
  //     method: 'GET'
  //   }).done(function(response){
  //       put the growl into the DOM
        // response.reverse().forEach(function(growl,index){
        //     addGrowlLocal(growl);
        // });
  //   }).fail(function(error){
  //     console.error('Error: ', error);
  //   });
  // };


  // socket.on('send growls', function(growls){
  //   // put the growl into the DOM
  //   $('.class-growls').empty();
  //   growls.reverse().forEach(function(growl,index){
  //     addGrowlLocal(growl);
  //   });
  // });
  // 
  // Survey.Survey.cssType = "bootstrap";
  // var surveyJSON = {pages:[{elements:[{type:"radiogroup",choices:[{value:"1",text:"Dog"},{value:"2",text:"Cat"}],name:"pet choice",startWithNewLine:false,title:"Do you want a dog or a cat?"}],name:"page1"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Tiny/Small"},{value:"2",text:"Medium"},{value:"3",text:"Large/Giant"}],name:"Size",title:"Size"}],name:"page2"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Less then a year"},{value:"2",text:"1-3"},{value:"3",text:"3-7"},{value:"4",text:"Senior"}],name:"Age",title:"Age"}],name:"page3"},{elements:[{type:"radiogroup",choices:[{value:"1",text:"Male"},{value:"2",text:"Female"}],name:"Sex",title:"Sex"}],name:"page4"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Short"},{value:"2",text:"Medium"},{value:"3",text:"Long"},{value:"4",text:"Hairless"}],name:"Hair Type",title:"Hair Type"}],name:"page5"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Kids"},{value:"2",text:"Dogs"},{value:"3",text:"Cats"},{value:"4",text:"All"}],name:"Family",title:"Family"}],name:"page6"},{elements:[{type:"checkbox",choices:[{value:"1",text:"House Trained"},{value:"2",text:"Needs Training"},{value:"3",text:"Trainable"}],name:"Training ",title:"Training Needs"}],name:"page7"},{elements:[{type:"radiogroup",choices:[{value:"1",text:"Yes"},{value:"2",text:"No"}],name:"Alergies",title:"Hypoallergenic "}],name:"page8"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Needs Supervisions"},{value:"2",text:"Left Alone for short period of time"},{value:"3",text:"Independent"}],name:"needs",startWithNewLine:false,title:"Dependency"}],name:"page9"},{elements:[{type:"radiogroup",choices:[{value:"1",text:"High"},{value:"2",text:"medium"},{value:"3",text:"Low"},{value:"4",text:"Lazy as fuckkkkkkk"}],name:"Energy",startWithNewLine:false,title:"Energy Level"}],name:"page10"}],showProgressBar:"bottom"}
  // function sendDataToServer(survey) {
  //     //send Ajax request to your web server.
  //     alert("The results are:" + JSON.stringify(s.data));
  // }
  // var survey = new Survey.Model(surveyJSON);
  // $("#surveyContainer").Survey({
  //     model: survey,
  //     onComplete: sendDataToServer
  // });



  function main(){
    retrieve_profile();
    setHandlers();

  };

  main();
});
