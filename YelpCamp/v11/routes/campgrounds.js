var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

router.get('/', function(req, res) {
	Campground.find({}, function(err, allcampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allcampgrounds });
		}
	});
});

router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

router.post('/', middleware.isLoggedIn, function(req, res) {
	var newname = req.body.name;
	var newimage = req.body.image;
	var newprice = req.body.price;
	var newdescription = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: newname, price: newprice, image: newimage, description: newdescription, author: author };
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

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, founndCampground) {
		res.render('campgrounds/edit', { campground: founndCampground });
	});
});

//UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			return res.redirect('/campgrounds');
		}
		res.redirect('/campgrounds/' + req.params.id);
	});
	//redirect to show page
});

//DESTROY CAMPGROUNDS
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		res.redirect('/campgrounds');
	});
});

module.exports = router;
