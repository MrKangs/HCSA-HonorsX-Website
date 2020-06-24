//Server file for website
//Author: Adam Kerr, Keegan, Kenneth

var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var peopleData = require('./peopleData');
var eventData = require('./eventData');
var communityServiceData = require('./communityServiceData')
var calendardata = require('./calendarData');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exp_handle({ defualtLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));


app.get('/', function(req, res, next) {
  console.log("Serving the Home Page");
  var nextEvent = eventData[0];
  res.status(200);
  res.render("homePage", {
    source: nextEvent.source,
    name: nextEvent.name,
    details: nextEvent.details,
    description: nextEvent.description,
    going: nextEvent.going,
    faqts: "true"
  });
});

var monthindex = 5;

app.get("/events", function(req, res, next){
  console.log("Serving the Events Page");
  res.status(200);
  res.render('eventsPage', {
    EVENTS: eventData,
    script: "./events.js",
    faqts: 1,
    month: calendardata[monthindex].month,
    weekdays: calendardata[monthindex].weekdays,
    daysofweek: calendardata[monthindex].dates,
  });
});


app.post("/events/:indexM/changeMonth", function(req, res, next){
  var direction = req.params.indexM;
  if(direction == 1 && monthindex < 11){
    monthindex += 1;
  }
  else if(direction == 0 && monthindex > 0){
    monthindex -= 1;
  }
});

app.post("/events/:event/addPerson", function(req, res, next){
  var event = req.params.event;
  if(eventData[event]){
    eventData[event].going.push({
      person: req.body.person,
      email: req.body.email,
      id: req.body.ID
    });
    fs.writeFile('eventData.json', JSON.stringify(eventData), function(err){
      console.log(err);
    });
    res.status(200).send("Person Successfully Added");
  }
  else res.status(400).send("This request needs both a name, email, and ONID");
});

app.get('/members', function(req, res, next){
  console.log("Serving the Members Page");
  res.status(200);
  res.render('peoplePage', {
    PEOPLE: peopleData,
  });
})

app.get('/community-service', function(req, res, next){
  console.log("Serving the Community Service Page");
  res.status(200);
  res.render('communityServicePage',{
    COMMUNITY: communityServiceData,
    script: "./communityService.js",
    faqts: 1,
    month: calendardata[monthindex].month,
    weekdays: calendardata[monthindex].weekdays,
    daysofweek: calendardata[monthindex].dates,
  });
});

app.post("/community-service/:indexM/changeMonth", function(req, res, next){
  var direction = req.params.indexM;
  if(direction == 1 && monthindex < 11){
    monthindex += 1;
  }
  else if(direction == 0 && monthindex > 0){
    monthindex -= 1;
  }
});

app.post("/community-service/:community/addPerson", function(req, res, next){
  var community = req.params.community;
  if(communityServiceData[community]){
    communityServiceData[community].going.push({
      person: req.body.person,
      email: req.body.email,
      id: req.body.ID
    });
    fs.writeFile('communityServiceData.json', JSON.stringify(communityServiceData), function(err){
      console.log(err);
    });
    res.status(200).send("Person Successfully Added");
  }
  else res.status(400).send("This request needs both a name, email, and ONID");;
});

app.get('*', function(req, res){
  console.log("Serving the 404 Page");
  res.status(404);
  res.render('404Page', {
  });
});

app.listen(port, function(){
  console.log("Server is listening on this port: ", port);
})
