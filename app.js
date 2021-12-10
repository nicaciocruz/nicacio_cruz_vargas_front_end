const PORT = 4000;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var GET = require("./GET/index");
app.use(bodyParser.urlencoded({
  extened: true
}));
app.use(express.static('www'));
app.use('/GET/', GET);
app.listen(PORT, function() {
  console.log("My https server listening on port " + PORT + "...");
});
