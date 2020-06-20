var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	expressSanitizer = require('express-sanitizer'),
	methodOverride = require('method-override'),
	localStrategy = require('passport-local'),
	User = require('./models/users'),
	passportLocalMongoose = require('passport-local-mongoose');

  mongoose.set('useNewUrlParser', true);
  mongoose.connect("mongodb://localhost/restful_blog_app");

app.use(require('express-session')({secret: "secret",
							        resave: false,
								     saveUninitialized: false}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));



// mongoose model configed
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);



//Restful routes

app.get('/', function(req,res){
	res.render('home');
});

app.get('/signup', function(req,res){
	res.render('signup');
});

app.post('/signup', function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render('signup');
        }
		else {
			passport.authenticate("local")(req,res, function(){
				res.redirect('/login');
			});
		}
    });
});

app.get('/login', function(req,res){
	res.render('login');
});

app.post('/login',passport.authenticate("local", {
				successRedirect: "/blogs",
	            failureRedirect: "/login"
			}), function(req,res){
});

app.get('/logout', function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
app.get('/blogs', isLoggedIn, function(req, res){
	Blog.find({}, function(err, allblogs){
		if(err){
		console.log(err);
	}
	else {
		res.render("index", {blogs: allblogs});
	}
	});
});

app.get("/blogs/new", function(req, res){
	res.render("new");
});

	
app.post("/blogs", function(req,res){
		Blog.create(req.body.blog, function(err, newBlog){
			if(err){
				res.render("new");
			}
			else {
				res.redirect("/blogs");
			}
   });
});

app.get("/blogs/:id", function(req, res){
   
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err) {
			res.redirect('/blogs');
       }
		else {
			res.render("show", {blog: foundBlog});
    }
  });
});

app.get("/blogs/:id/edit", function(req, res){
Blog.findById(req.params.id, function(err,foundBlog){
		if(err) {
			res.redirect('/blogs');
       }
		else {
			res.render("edit", {blog: foundBlog});
    }
  });
});
	
app.put("/blogs/:id", function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err) {
			res.redirect('/blogs');
       }
		else {
			res.redirect("/blogs/"+ req.params.id);
		}
 });
});

app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect('/blogs');
		}
		else {
			res.redirect('/blogs');
		}
  });
});
app.listen(3000, function(){
	console.log("server on");
});