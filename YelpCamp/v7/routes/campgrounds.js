var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

router.get('/', function(req, res) {
	Campground.find({}, function(err, allcampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allcampgrounds });
		}
	});
});

router.get('/new', function(req, res) {
	res.render('campgrounds/new');
});

router.post('/', function(req, res) {
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

router.get('/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

module.exports = router;
