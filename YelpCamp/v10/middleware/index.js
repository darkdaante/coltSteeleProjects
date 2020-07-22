//all the middleware
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err) {
				return res.redirect('back');
			}
			//does user own the campground?
			if (foundCampground.author.id.equals(req.user._id)) {
				return next();
			}
			res.redirect('back');
		});
	} else {
		res.redirect('/login');
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				return res.redirect('back');
			}
			//does user own the Comment?
			if (foundComment.author.id.equals(req.user._id)) {
				return next();
			}
			res.redirect('back');
		});
	} else {
		res.redirect('/login');
	}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

module.exports = middlewareObj;
