require('dotenv').config();
var express = require('express');
var app = express();
var multer = require('multer');
var bodyParser =  require("body-parser");
app.use(express.static('public'));
app.use('/images', express.static('images'));
//body-parser config;
app.use(bodyParser.raw({ inflate: true, type: "application/json" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer.array());
//routers
require("./routers/users.routers")(app);
require("./routers/items.routers")(app);
require("./routers/carts_products.routers")(app);
require("./routers/album_concept.routers")(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});