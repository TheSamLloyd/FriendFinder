const http = require('http');
const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = (process.env.PORT || 80);
const apiRoutes = require(path.join(__dirname,"app","routing","apiRoutes"))
const htmlRoutes = require(path.join(__dirname,"app","routing","htmlRoutes"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"app","public")));
app.use(htmlRoutes);
app.use(apiRoutes);
app.listen(port,function(){
	console.log("Listening on port "+port);
});