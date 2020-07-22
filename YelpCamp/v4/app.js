var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seeds');
var Comment = require('./models/comment');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//seedDB();

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

app.get('/campgrounds/:id/comments/new', function(req, res) {
	//find campground by id
	Campground.findById(req.params.id, function(err, foundcampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: foundcampground });
		}
	});
});

app.post('/campgrounds/:id/comments', function(req, res) {
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

app.listen(3000, function() {
	console.log('YelpCamp Server Has Started');
});
