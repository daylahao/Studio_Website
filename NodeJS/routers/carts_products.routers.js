const auth = require("../common/hashPassword").auth;
module.exports = function (router) {
    const cartsProductscontroller = require("../controllers/carts_products.controller");
    router.post("/cartsproducts", cartsProductscontroller.insert);
    router.post("/cartsproducts/user", cartsProductscontroller.getById);
    // router.get("/cartsproducts", cartsProductscontroller.getAll);
    router.get("/cartsproducts/users/:id", cartsProductscontroller.getByUID);
  };