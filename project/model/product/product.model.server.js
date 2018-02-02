var mongoose = require("mongoose");
var ProductSchema = require("./product.schema.server");
var ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = ProductModel;

ProductModel.findAllProducts = findAllProducts;


function findAllProducts() {
  return ProductModel.find({});
}
