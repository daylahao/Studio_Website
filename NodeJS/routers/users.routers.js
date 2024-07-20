module.exports = function (router) {
    const usersControllers = require("../controllers/users.controller");
    router.post("/users", usersControllers.insert);
    // router.get("/users/test", usersControllers.test);
    router.get("/users/:id", usersControllers.getById);
    router.get("/users", usersControllers.getAllName);
    // router.post("/users/generate", usersControllers.generate);
    router.post("/users/login", usersControllers.login);
    router.post("/users/register", usersControllers.register);
    // router.post("/users/validate", usersControllers.validate);
  };