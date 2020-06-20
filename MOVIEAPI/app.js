var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res){
  var query = req.query.search;
request('http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb' + query, function(error, response, body){
	if(!error && response.statusCode == 200) {
		var parsedData = JSON.parse(body);
	
		res.render("results", {parsedData: parsedData});
    }
	else if(error) {
		console.log("SOMETHING WENT WRONG");
		console.log(error);
     }
});
	});

app.listen(3000, function(){
	console.log('Movie app has started');
});