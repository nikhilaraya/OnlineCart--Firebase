module.exports = function (app) {

  var productModel = require('../model/product/product.model.server');


  app.get('/api/products', findAllProducts);



  function findAllProducts(req, res) {
    productModel.findAllProducts()
      .then(function (res1) {
        res.json(res1);
      });
  }
}
