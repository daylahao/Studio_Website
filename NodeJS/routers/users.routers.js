module.exports = function (router) {
    const usersControllers = require("../controllers/users.controller");
    router.post("/users", usersControllers.insert);
    router.get("/users/:id", usersControllers.getById);
    router.get("/users", usersControllers.getAllName);
  };