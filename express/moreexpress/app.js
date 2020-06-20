var express = require("express");

var app = express();


app.get("/", function(req, res){
	res.render("dogs.ejs", "ht.css", "ht.js");
	
	res.send("Hi there chris");
});

app.listen(3000, function(){
	console.log("Server is connect");
});