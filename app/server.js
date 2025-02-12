var express = require('express');
var path = require('path');  // Import path module
var fs=require('fs');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();
// Use body-parser to parse URL-encoded data and JSON
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Serve the index.html at the root URL
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
// Fetch the user's profile data
app.get('/get-profile', function (req, res) {
  var response = res;
  // Connect to the db
  MongoClient.connect("mongodb://admin:password@mongodb:27017", function (err, client) {
    if (err) throw err;

    var db = client.db('user-account');
    var query = { userId: 1 };
    db.collection('users').findOne(query, function (err, result) {
      if (err) throw err;
      console.log(result); 
      client.close();
      response.send(result);
    });
  });
});
// Handle updating the user profile
app.post('/update-profile', function (req, res) {
  var userObj = req.body;
  var response=res;

  console.log('connecting to db...');

  MongoClient.connect("mongodb://admin:password@mongodb:27017", function (err, client) {
    if (err) throw err;

    var db = client.db('user-account');
    userObj['userId'] = 1
    var query = { userId: 1 };
    var newValues = { $set: userObj };
    
    console.log('successfully conceted to user-account db');

    db.collection("users").updateOne(query, newValues, {upsert: true}, function(err, res) {
      if (err) throw err;
      console.log('successfully updated or inserted');
      client.close();
      response.send(userObj);
    });
  });
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
