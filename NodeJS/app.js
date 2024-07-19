require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser =  require("body-parser");
//body-parser config;
app.use(bodyParser.raw({ inflate: true, type: "application/json" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routers
require("./routers/users.routers")(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});