const itemsController = require("../controllers/items.controller");

module.exports = function (router) {
    // const multer = require('multer');
    const uploadItems = require("../common/handlefiles").uploadItems;
    const itemscontroller = require("../controllers/items.controller");
    const auth = require("../common/hashPassword").auth;
    router.post("/items",uploadItems.single('image'),auth(['ADMIN','MOD']),itemscontroller.insert);
    router.delete("/items",auth(['ADMIN','MOD']),itemscontroller.delete);
    router.post("/items/:id",uploadItems.single('image'),auth(['ADMIN','MOD']),itemscontroller.update);
    router.get("/items/:id", itemscontroller.getById);
    router.get("/items",itemscontroller.getAllName);
    router.get("/item/:type",itemsController.getByType);
  };