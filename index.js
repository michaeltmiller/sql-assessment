var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var config = require('./config');
//Need to enter username and password for your database
var connString = config.CONN;

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });
})

app.get('/api/users', function(req, res, next) {
  db.get_all_users(function(err, resp) {
    res.json(resp)
  })
})

app.get('/api/vehicles', function(req, res, next) {
  db.get_all_vehicles(function(err, resp) {
    res.json(resp)
  })
})

app.post('/api/users', function(req, res, next) {
  db.add_user([req.body.firstname, req.body.lastname, req.body.email] ,function(err, resp) {
    res.json(resp);
  })
})

app.post('/api/vehicles', function(req, res, next) {
  db.add_vehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function(err, resp) {
    res.json(resp)
  })
})

app.get('/api/user/:userId/vehiclecount', function(req, res, next) {
  db.users_vehicle_count([req.params.userId], function(err, resp) {
    console.log(resp[0])
    res.json(resp[0])
  })
})

app.get('/api/user/:userId/vehicle', function(req, res, next) {
  db.user_vehicles([req.params.userId], function(err, resp) {
    res.json(resp)
  })
})

app.get('/api/vehicle', function(req, res, next) {
  if(req.query.UserEmail) {
    db.user_vehicles_by_email([req.query.UserEmail], function(err, resp) {
      res.json(resp)
    })
  } else if(req.query.userFirstStart) {
    const lettersQuery = req.query.userFirstStart + '%';
    db.get_user_vehicles_by_start_letters([lettersQuery], function(err, resp) {
      res.json(resp)
    })
  } else {
    res.json('not a valid query')
  }
})

app.get('/api/newervehiclesbyyear', function(req, res, next) {
  db.get_newer_vehicles(function(err, resp) {
    res.json(resp)
  })
})

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res, next) {
  db.change_vehicle_owner([req.params.vehicleId, req.params.userId], function(err, resp) {
    res.json(resp)
  })
})

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res, next) {
  db.remove_vehicle_ownership([req.params.userId, req.params.vehicleId], function(err, resp) {
    res.json(resp)
  })
})

app.delete('/api/vehicle/:vehicleId', function(req, res, next) {
  db.remove_vehicle([req.params.vehicleId], function(err, resp) {
    res.json(resp)
  })
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
