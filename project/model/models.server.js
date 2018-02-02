var mongoose = require("mongoose");
var connectionString = 'mongodb://localhost/myCart';

var db = mongoose.connect(connectionString, {useMongoClient: true});

module.exports = db;

