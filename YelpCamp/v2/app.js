var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350',
// 		description: 'This is a huge granite hill, no bathrooms. No water.But Beautiful granite Hill'
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('Newly created Campground:');
// 			console.log(campground);
// 		}
// 	}
// );

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
	Campground.findById(req.params.id, function(err, foundCampground) {
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
