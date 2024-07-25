
module.exports = function (router) {
    const usersControllers = require("../controllers/users.controller");
    const auth = require("../common/hashPassword").auth;
    const updateavt = require("../common/handlefiles").uploadAvt;
    router.post("/users", usersControllers.insert);
    // router.get("/users/test", usersControllers.test);
    router.get("/users/:id", usersControllers.getById);
    router.get("/users", usersControllers.getAllName);
    // router.post("/users/generate", usersControllers.generate);
    router.post("/users/login", usersControllers.login);
    router.post("/users/register", usersControllers.register);
    router.delete("/users",auth(['ADMIN']),usersControllers.delete);
    router.post("/user/:id",updateavt.single('avt'),usersControllers.update);
    // router.post("/users/validate", usersControllers.validate);
  };