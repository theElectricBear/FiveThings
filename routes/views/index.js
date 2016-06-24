var keystone = require('keystone'),
	async = require('async'),
	Comment = keystone.list('Comment'),
	Submission = keystone.list('Submission');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		submissions: [],
		comments: []
	};

	// Load the submissions
	view.on('init', function (next) {
		Submission
		.paginate({
			page: req.query.page || 1,
				perPage: 3,
		})
		.where('state', 'published')
		.sort('-publishedOn')
		.exec(function (err, results) {
			locals.data.submissions = results;
			console.log(locals.data.submissions);
			next(err);
		});
	});
	// Load the comments
	view.on('init', function (next) {
		Comment.model
		.where('state', 'published')
		.sort('-publishedOn')
		.exec(function (err, results) {
			locals.data.comments = results;
			console.log(locals.data.comments);
			next(err);
		});
	});


	// Create a Submission
	view.on('post', { action: 'submission.create' }, function (next) {

		var newComment = new Comment.model({
			state: 'published'
		});

		var updater = newSubmission.getUpdateHandler(req);

		updater.process(req.body, {
			fields: ['name', 'realName', 'location', 'age', 'email', 'thing1', 'thing2', 'thing3', 'thing4', 'thing5'],
			flashErrors: true,
			logErrors: true,
		}, function (err) {
			if (err) {
				validationErrors = err.errors;
			} else {
				return res.redirect('/');
			}
			next();
		});

	});

	// Create a Submission
	view.on('post', { action: 'comment.create' }, function (next) {

		var newSubmission = new Submission.model({
			state: 'published'
		});

		var updater = newSubmission.getUpdateHandler(req);

		updater.process(req.body, {
			fields: ['name', 'realName', 'location', 'age', 'email', 'thing1', 'thing2', 'thing3', 'thing4', 'thing5'],
			flashErrors: true,
			logErrors: true,
		}, function (err) {
			if (err) {
				validationErrors = err.errors;
			} else {
				return res.redirect('/');
			}
			next();
		});

	});

	// Render the view
	view.render('index');
};
