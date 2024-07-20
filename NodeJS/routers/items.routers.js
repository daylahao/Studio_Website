module.exports = function (router) {
    const itemscontroller = require("../controllers/items.controller");
    const auth = require("../common/hashPassword").auth;
    router.post("/items", itemscontroller.insert);
    router.get("/items/:id", itemscontroller.getById);
    router.get("/items",auth(['ADMIN']),itemscontroller.getAllName);
  };