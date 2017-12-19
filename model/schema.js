var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.roomSchema = new Schema({
    roomName: { type : String, required : true }
});

exports.messagesSchema = new Schema({
    author: String,
    body:   String,
    roomName: String
});

exports.usersSchema = new Schema({
    username: { type : String, unique : true, required : true, dropDups: true },
    password: { type : String, required : true}
});

exports.Rooms = mongoose.model('Rooms',exports.roomSchema);
exports.Messages = mongoose.model('Messages',exports.messagesSchema);
exports.Users = mongoose.model('Users',exports.usersSchema);
