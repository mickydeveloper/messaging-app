var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.blogSchema = new Schema({
    author: String,
    body:   String
});

exports.usersSchema = new Schema({
    username: { type : String, unique : true, required : true, dropDups: true },
    password: { type : String, required : true}
});

exports.Blog = mongoose.model('Blog',exports.blogSchema);
exports.Users = mongoose.model('Users',exports.usersSchema);
