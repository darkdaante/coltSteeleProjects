var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seeds');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

seedDB();

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, allcampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds: allcampgrounds });
		}
	});
});

app.get('/campgrounds/new', function(req, res) {
	res.render('new.ejs');
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
			res.render('show', { campground: foundCampground });
		}
	});
});

app.listen(3000, function() {
	console.log('YelpCamp Server Has Started');
});
