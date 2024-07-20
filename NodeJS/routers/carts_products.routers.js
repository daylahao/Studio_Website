module.exports = function (router) {
    const cartsProductscontroller = require("../controllers/carts_products.controller");
    router.post("/cartsproducts", cartsProductscontroller.insert);
    // router.get("/cartsproducts/:id", cartsProductscontroller.getById);
    router.get("/cartsproducts", cartsProductscontroller.getAll);
    router.get("/cartsproducts/:id", cartsProductscontroller.getByUID);
  };