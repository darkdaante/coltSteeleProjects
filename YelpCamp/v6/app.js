var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require('./models/campground');
var seedDB = require('./seeds');
var User = require('./models/user');
var Comment = require('./models/comment');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v6', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// seedDB();

//==============================
//    PASSPORT CONFIGURATION
//==============================

app.use(
	require('express-session')({
		secret: "I like hermione granger but I'm not sure if i like Emma Watson.",
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, allcampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allcampgrounds });
		}
	});
});

app.get('/campgrounds/new', function(req, res) {
	res.render('campgrounds/new');
});

app.post('/campgrounds', function(req, res) {
	var newname = req.body.name;
	var newimage = req.body.image;
	var newdescription = req.body.description;
	var newCampground = { name: newname, image: newimage, description: newdescription };
	Campground.create(newCampground, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			console.log('New Campground Added');
			console.log(Campground);
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

// =========================
//      COMMENTS ROUTES
// =========================

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res) {
	//find campground by id
	Campground.findById(req.params.id, function(err, foundcampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: foundcampground });
		}
	});
});

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {
	//lookup campground using id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
	//create new comment
	//connect new comment to campground
	//redirect campground to show page
});

// =========================
//        AUTH ROUTES
// =========================

//show register form
app.get('/register', function(req, res) {
	res.render('register');
});

//handle sign up logic
app.post('/register', function(req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function() {
			res.redirect('/campgrounds');
		});
	});
});

//show login form
app.get('/login', function(req, res) {
	res.render('login');
});

//handle login logic
app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}),
	function(req, res) {}
);

//logout route
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

app.listen(3000, function() {
	console.log('YelpCamp Server Has Started');
});
