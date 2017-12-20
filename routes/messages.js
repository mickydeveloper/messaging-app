var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET messages */
router.get('/get', function (req, res, next) {
    schema.Messages.find({ "roomName": req.query.roomName }).exec(function (err, messages) {
        if (err)
            return console.error(err);
        console.log("Load success: ", messages);
        res.send(messages);
    });

});

/* POST single message */
router.post('/post', function (req, res, next) {
    var instance = new schema.Messages(req.body);

    schema.Messages.find({}).sort({ _id: -1 }).skip(1000).exec(function (err, messages) {
        console.log("Hallo 2");
        if (err)
            return console.error(err);
        console.log("Loader success: ", messages);
        messages.forEach(function (message) {
            console.log("Loader success: ", message);
            schema.Messages.findByIdAndRemove(message._id).exec();
        });
    });

    instance.save(function (err, Message) {
        result = err ? err : Message;
        res.send(result);
        router.notifyclients(Message);
        return result;
    });
});


/* Notify messages to connected clients */
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
};
router.notifyclients = function (message) {
    if(message){
        router.clients.forEach(function (socket) {
            socket.emit(message.roomName, message);
        })
    }
}

//export the router
module.exports = router;
