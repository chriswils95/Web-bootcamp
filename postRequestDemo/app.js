var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var friends = ["James", "Mark", "John", "Isatu"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
	res.render("home");
});


app.post("/add", function(req, res){
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	console.log(req.body.newFriend);
	res.redirect("/friends");
});


app.get("/friends", function(req, res){
    
	
	res.render("friends", {friends: friends});
});


app.listen(3000, function(){
		console.log("server started");
});
