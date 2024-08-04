module.exports = function (router) {
  const auth = require("../common/hashPassword").auth;
    const cartsProductscontroller = require("../controllers/carts_products.controller");
    router.post("/cartsproducts",auth(['USER','ADMIN']),cartsProductscontroller.insert);
    router.get("/cartsproducts/user",auth(['USER','ADMIN']),cartsProductscontroller.getById);
    // router.get("/cartsproducts", cartsProductscontroller.getAll);
    router.get("/cartsproducts/users/:id",auth(['USER','ADMIN']), cartsProductscontroller.getByUID);
    router.delete("/cartsproducts",cartsProductscontroller.delete);
    router.post("/cartsproducts/complete",cartsProductscontroller.complete);
    router.post("/cartsproducts/update",cartsProductscontroller.update);
  };