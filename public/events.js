//Events javascript file
//Author: Adam Kerr, Keegan, Kenneth Kang

var rsvpIndexClick = -1;

function handleAcceptClick(){
  var person = document.getElementById('person-input').value.trim();
  var email = document.getElementById('email-input').value.trim();
  var id = document.getElementById('id-input').value.trim();
  var reg = /^([A-Za-z0-9_\-\.])+\@(oregonstate)+\.(edu)$/;

  if(!person || !email || !id) alert("All fields must be filled in!");
  if(id.length != 9) alert("Invalid ONID number!");
  if(reg.test(email) == false) alert("Invalid Email Address!");
  else{
    var request = new XMLHttpRequest();
    var requestUrl = "/events/" + rsvpIndexClick + "/addPerson";
    request.open('POST', requestUrl);

    var requestBody = JSON.stringify({
      person: person,
      email: email,
      ID: id
    });

    request.setRequestHeader(
      'Content-Type',
      'application/json'
    );

    request.addEventListener('load', function(event){
      if(event.target.status === 200){
        var newRSVP = {
          person: person,
          email: email
        };
        var rsvpHTML = Handlebars.templates.rsvp(newRSVP);
        var container = document.querySelector('.event-rsvp-list' + rsvpIndexClick);
        if(container) container.insertAdjacentHTML("beforeend", rsvpHTML);
        closeModal();
      }
      else{
        alert("Error storing RSVP the in database: " + event.target.response);
      }
    });

    request.send(requestBody);
  }
}


window.addEventListener('DOMContentLoaded', function () {
var button1 = document.getElementById("0");
button1.addEventListener('click', function(){
    openModal(0);
});

var button2 = document.getElementById("1");
button2.addEventListener('click', function(){
    openModal(1);
});

var button3 = document.getElementById("2");
button3.addEventListener('click', function(){
    openModal(2);
});

var button4 = document.getElementById("3");
button4.addEventListener('click', function(){
    openModal(3);
});

var cancelButton = document.getElementById("rsvp-cancel-button");
cancelButton.addEventListener('click', function(){
  closeModal();
});

var addRSVPButton = document.getElementById("rsvp-add-button");
addRSVPButton.addEventListener('click', function(){
  handleAcceptClick();
});

var nextMonthButton = document.getElementById("next-month");
nextMonthButton.addEventListener('click', function(){
  changeMonth(1);
});

var previousMonthButton = document.getElementById("previous-month");
previousMonthButton.addEventListener('click', function(){
  changeMonth(0);
});
});

function openModal(index){
  rsvpIndexClick=index;
  console.log(rsvpIndexClick);
  //Make the modal unhidden here
  var backdrop = document.getElementById("backdrop");
  var modal = document.getElementById("rsvp-add");
  var personText = document.getElementById("person-input");
  var emailText = document.getElementById("email-input");
  var idText = document.getElementById("id-input");
  backdrop.style.display = "block";
  modal.style.display = "block";
  personText.value = "";
  emailText.value = "";
  idText.value = "";

}

function closeModal(){
  rsvpIndexClick=-1;
  console.log(rsvpIndexClick);
  //Make the modal hidden here
  var backdrop = document.getElementById("backdrop");
  var modal = document.getElementById("rsvp-add");
  backdrop.style.display = "none";
  modal.style.display = "none";
}

var monthIndex = 6;

function changeMonth(direction){
  var temp = direction;
  var requestM = new XMLHttpRequest();
  var requestUrlM = "/events/" + temp + "/changeMonth";
  requestM.open('POST', requestUrlM);
  requestM.send(temp);
  location.reload();
  
}



