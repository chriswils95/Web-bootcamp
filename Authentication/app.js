var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	bodyParser= require('body-parser'),
	localStrategy = require('passport-local'),
	User = require('./models/users'),
	passportLocalMongoose = require('passport-local-mongoose'),
	app = express();

app.use(require('express-session')({secret: "secret",
							        resave: false,
								     saveUninitialized: false}));

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost/authdemo");

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));




app.get('/', function(req,res){
	res.render('home');
});

app.get('/secret', isLoggedIn, function(req,res){
	res.render('secret');
});

app.get('/register', function(req,res){
	res.render('register');
});
app.post('/register', function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render('register');
        }
		else {
			passport.authenticate("local")(req,res, function(){
				res.redirect('/login');
			});
		}
    });
});
app.get('/login',function(req,res){
	res.render('login');
});
app.post('/login',passport.authenticate("local", {
				successRedirect: "/secret",
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
app.listen(3000, function(){
  console.log('server on');
});