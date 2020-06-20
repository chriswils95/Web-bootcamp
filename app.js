var express = require("express");

var app = express();

app.get("/", function(req, res){
	
	res.send("Hi there");
		
		});

app.get("/bye", function(req, res){
	 
	res.send("Bye there");
});

app.get("/Dog", function(req, res){
	console.log("Someone requested a dog");
	res.send("MEow");
});

app.get("/r/:subredditName", function(req, res){
	console.log(req.params);
	res.send("Here you go chris");
});



app.get("*", function(req, res){
	console.log("");
	res.send("you are a start");
});


app.listen(3000, function() {
  console.log('Server listening on port 3000'); 
});


console.log("hello");
