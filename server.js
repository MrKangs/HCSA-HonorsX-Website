//Server file for website
//Author: Adam Kerr, Keegan, Kenneth

var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var MongoClient = require('mongodb').MongoClient;
var connectionString = 'mongodb+srv://MrKangs:zwqF2R6aIoN184kh@hcsahonorsx-el8jr.mongodb.net/test?retryWrites=true&w=majority';




var fs = require('fs');
const { runInNewContext } = require('vm');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exp_handle({ defualtLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));

MongoClient.connect(connectionString, {useUnifiedTopology: true})
.then(client => {

  console.log("Connected to Database");
  const db = client.db('HCSA_HonorsX');
  const eventCollection = db.collection('eventData');
  const communityServiceCollection = db.collection('communityServiceData');
  const calendarCollection = db.collection('calendarData');
  const peopleCollection = db.collection('peopleData');
  
  app.get('/', function(req, res, next) {
    eventCollection.find().toArray()
    .then(result => {
      res.render("homePage", {
        source: result[0].source,
        name: result[0].name,
        details: result[0].details,
        description: result[0].description,
        going: result[0].going,
        faqts: "true"
      });
      console.log("Serving the Home Page");
      res.status(200);
    });
    
    
  });
  
  var monthindex = 6;
  
  app.get("/events", function(req, res, next){
    calendarCollection.find().toArray()
    .then(calendar => {
      eventCollection.find().toArray()
      .then(results => {
        res.render('eventsPage', {
          EVENTS: results,
          script: "./events.js",
          faqts: 1,
          month: calendar[monthindex].month,
          weekdays: calendar[monthindex].weekdays,
          daysofweek: calendar[monthindex].dates,
        });
      })
      console.log("Serving the Events Page");
      res.status(200);
    })
    
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
    var n = req.params.event;
    var newObj = {
      person: req.body.person,
      email: req.body.email,
      id: req.body.ID
    }

    console.log(newObj);
    if (eventCollection.find({eventNum: n})){
      console.log("It passes");
      eventCollection.findOneAndUpdate({eventNum: n}, {$addToSet: {'going': newObj}})
    .then(result => {
      console.log("Updated!");
      res.statusCode(200);
      res.redirect('/events');
      })
    }
    else{
      res.status(400).send("This request needs both a name, email, and ONID");
    }
  });
    
  app.get('/community-service', function(req, res, next){

    calendarCollection.find().toArray()
    .then(calendar => {
      communityServiceCollection.find().toArray()
      .then(results => {
        res.render('communityServicePage',{
          COMMUNITY: results,
          script: "./communityService.js",
          faqts: 1,
          month: calendar[monthindex].month,
          weekdays: calendar[monthindex].weekdays,
          daysofweek: calendar[monthindex].dates,
        });
      });
      console.log("Serving the Community Service Page");
      res.status(200);
    })
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
    var n = req.params.community;
    var newObj = {
      person: req.body.person,
      email: req.body.email,
      id: req.body.ID
    }

    console.log(newObj);
    if (communityServiceCollection.find({serviceNum: n})){
      console.log("It passes");
      communityServiceCollection.findOneAndUpdate({serviceNum: n}, {$addToSet: {'going': newObj}})
    .then(result => {
      console.log("Updated!");
      res.status(200);
      res.redirect('/community-service');
      })
    }
    else{
      res.status(400).send("This request needs both a name, email, and ONID");
    }
  });

  app.get('/members', function(req, res, next){
    peopleCollection.find().toArray()
    .then(results => {
      res.render('peoplePage', {
        PEOPLE: results
      });
      console.log("Serving the Members Page");
      res.status(200);
    });
  });
  
  app.get('*', function(req, res){
    console.log("Serving the 404 Page");
    res.status(404);
    res.render('404Page', {
    });
  });
}).catch(error => console.error(error));

app.listen(port, function(){
  console.log("Server is listening on this port: ", port);
})
