Survey.Survey.cssType = "bootstrap";
var surveyJSON = {pages:[{elements:[{type:"radiogroup",choices:[{value:"1",text:"Dog"},{value:"2",text:"Cat"}],name:"pet choice",startWithNewLine:false,title:"Do you want a dog or a cat?"}],name:"page1"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Tiny/Small"},{value:"2",text:"Medium"},{value:"3",text:"Large/Giant"}],name:"Size",title:"Size"}],name:"page2"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Less then a year"},{value:"2",text:"1-3"},{value:"3",text:"3-7"},{value:"4",text:"Senior"}],name:"Age",title:"Age"}],name:"page3"},{elements:[{type:"radiogroup",choices:[{value:"1",text:"Male"},{value:"2",text:"Female"}],name:"Sex",title:"Sex"}],name:"page4"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Short"},{value:"2",text:"Medium"},{value:"3",text:"Long"},{value:"4",text:"Hairless"}],name:"Hair Type",title:"Hair Type"}],name:"page5"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Kids"},{value:"2",text:"Dogs"},{value:"3",text:"Cats"},{value:"4",text:"All"}],name:"Family",title:"Family"}],name:"page6"},{elements:[{type:"checkbox",choices:[{value:"1",text:"House Trained"},{value:"2",text:"Needs Training"},{value:"3",text:"Trainable"}],name:"Training ",title:"Training Needs"}],name:"page7"},{elements:[{type:"radiogroup",choices:[{value:"1",text:"Yes"},{value:"2",text:"No"}],name:"Alergies",title:"Hypoallergenic "}],name:"page8"},{elements:[{type:"checkbox",choices:[{value:"1",text:"Needs Supervisions"},{value:"2",text:"Left Alone for short period of time"},{value:"3",text:"Independent"}],name:"needs",startWithNewLine:false,title:"Dependency"}],name:"page9"},{elements:[{type:"radiogroup",choices:[{value:"1",text:"High"},{value:"2",text:"medium"},{value:"3",text:"Low"},{value:"4",text:"Lazy as fuckkkkkkk"}],name:"Energy",startWithNewLine:false,title:"Energy Level"}],name:"page10"}],showProgressBar:"bottom"}
>>>>>>> dev
function sendDataToServer(survey) {
    //send Ajax request to your web server.
    alert("The results are:" + JSON.stringify(s.data));
}
var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});
