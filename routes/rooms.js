var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET rooms */
router.get('/get', function(req, res, next) {
    schema.Rooms.find({}).exec(function (err, rooms) {
        if (err)
            return console.error(err);
        console.log("Load success: ", rooms);
        res.send(rooms);
    });

});

/* POST single room */
router.post('/post', function(req, res, next) {
    var instance = new schema.Rooms(req.body);

    schema.Rooms.find({}).sort({_id:-1}).skip(10).exec(function (err, rooms) {
        console.log("Hallo 2");
        if (err)
            return console.error(err);
        console.log("Loader success: ", rooms);
        rooms.forEach(function(room){
            console.log("Loader success: ", room);
            schema.Rooms.findByIdAndRemove(room._id).exec();
        });
    });

    instance.save(function (err, Room) {
        result = err?err:Room;
        res.send(result);
        router.notifyclients();
        return result;
    });
});


/* Notify messages to connected clients */
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyclients = function (client) {
    schema.Rooms.find({}).exec(function (err, rooms) {
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refreshRooms', rooms);
        })
    });
}

//export the router
module.exports = router;
