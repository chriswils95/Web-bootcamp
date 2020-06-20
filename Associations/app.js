var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo",{ useNewUrlParser: true });

var Post = require("./models/post.js");
var User = require("./models/user.js");




Post.create({
	title: "jgvjhvhvjhvvhvhvh",
	content: "fxcvkhcghfxcgjcfxfcjgcghchgcchfchchchfcfhcfch"
}, function(err, post){
	if(err) {
		console.log(err);
	}
	else {
		User.findOne({email: "cw2636@email"}, function(err, found){
			if(err){
				console.log(err);
        }
			else {
				found.posts.push(post);
				found.save(function(err, data){
					if(err){
						console.log(err);
                   }
					else {
						console.log(data);
					}
				});
			}
     });
  }
});


User.findOne({email: "cw2636@email"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err);
	}
	else {
		console.log(user);
   }
});








