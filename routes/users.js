var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');
var crypto = require('crypto');

/* GET all users messages */
router.get('/get', function(req, res, next) {
    schema.Users.find({}).exec(function (err, users) {
        if (err)
            return console.error(err);
        console.log("Load success: ", users);
        res.send(users);
    });

});

/* POST single user*/
router.post('/post', function(req, res, next) {
    var instance = new schema.Users(req.body);
    /** Example post body:
     {
       "username": "Morten Mathiasen",
       "password": "12345"
     }
     **/

    schema.Users.find({}).sort({_id:-1}).skip(10).exec(function (err, users) {
        if (err)
            return console.error(err);
        console.log("Loader success: ", users);
        users.forEach(function(user){
            console.log("Loader success: ", user);
            schema.Users.findByIdAndRemove(user._id).exec();
        });
    });

    instance.save(function (err, User) {
        result = err?err:User;
        res.send(result);
        return result;
    });
});

router.post('/authenticate', function(req, res, next) {
  schema.Users.find({ "username": req.body.username, "password": req.body.password }).exec(function (err, users) {
    if (err){
      return console.error(err);
    }

    console.log(req.body.password);
    console.log(users);

    if(users[0]){
      res.send(req.body);
    }
    else{
      res.status(500).send('Wrong Username and Password!')
    }
  });
});

//export the router
module.exports = router;
