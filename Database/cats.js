var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});


var Cat = mongoose.model("Cat", catSchema);


Cat.create({
	name: "Prince",
	age: 2,
	temperament: "bad"
}, function(err, cat){
	if(err) {
		console.log(err);
	}
	else {
		console.log(cat);
	}
});

Cat.find({}, function(err, cats){
	if(err) {
		console.log("Oh no");
	}
	else {
		console.log("All the cats......");
		console.log(cats);
	}
});