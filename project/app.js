module.exports = function (app) {

  var db = require("./model/models.server");
  require("./services/user.service.server")(app);
  require("./services/product.service.server")(app);
};
