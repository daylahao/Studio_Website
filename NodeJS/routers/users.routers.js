
module.exports = function (router) {
    const usersControllers = require("../controllers/users.controller");
    const auth = require("../common/hashPassword").auth;
    const updateavt = require("../common/handlefiles").uploadAvt;
    router.post("/users", usersControllers.insert);
    router.post("/users/emailnotify",usersControllers.EmailNotify);
    router.post("/users/login", usersControllers.login);
    router.post("/users/register", usersControllers.register);
    // router.get("/users/test", usersControllers.test);
    router.get("/users/info", usersControllers.getInformation);
    router.get("/users/:id",auth(['ADMIN']), usersControllers.getById);
    router.get("/users",auth(['ADMIN']), usersControllers.getAllName);
    // router.post("/users/generate", usersControllers.generate);
    router.delete("/users",auth(['ADMIN']),usersControllers.delete);
    router.post("/user/:id",updateavt.single('avt'),usersControllers.update);
    // router.post("/users/validate", usersControllers.validate);
  };