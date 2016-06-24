var keystone = require('keystone'),
	async = require('async'),
	Post = keystone.list('Post'),
	PostComment = keystone.list('PostComment'),
	Submission = keystone.list('Submission');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'about';

	locals.data = {
		posts: [],
		submissions: [],
	};

	// Load the submissions
	view.on('init', function (next) {
		Submission
		.paginate({
			page: req.query.page || 1,
				perPage: 10,
				maxPages: 10,
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.exec(function (err, results) {
			locals.data.submissions = results;
			console.log(locals.data.submissions);
			next(err);
		});
	});


	// Create a Submission
	view.on('post', { action: 'submission.create' }, function (next) {

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
				req.flash('success', 'Your Submission was added.');
			}
			next();
		});

	});

	// Render the view
	view.render('index');
};
