var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var campgrounds = [
	{
		name: 'Salmon Creek',
		image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name: 'Granite Hill',
		image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name: "Mountain Goat's Rest",
		image: 'https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name: '1',
		image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name: '2',
		image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name: '3',
		image: 'https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name: '4',
		image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350'
	}
];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.get('/campgrounds/new', function(req, res) {
	res.render('new.ejs');
});

app.post('/campgrounds', function(req, res) {
	var newname = req.body.name;
	var newimage = req.body.image;
	var newCampground = { name: newname, image: newimage };
	campgrounds.push(newCampground);
	res.redirect('/campgrounds');
});

app.listen(3000, function() {
	console.log('YelpCamp Server Has Started');
});
