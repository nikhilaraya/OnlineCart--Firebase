var mongoose = require("mongoose");
var ProductSchema = mongoose.Schema({
  name: String,
  productId : String,
  imageURL: String,
  department: String,
  store: String,
  price: Number,
  quantity: String
}, {collection: 'product'});

module.exports = ProductSchema;
