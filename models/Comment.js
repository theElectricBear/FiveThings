var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
	Posts
	=====
 */

var Comment = new keystone.List('Comment', {
	label: 'Comments',
});

Comment.add({
	submission: { type: String, initial: true, index: true },
	state: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});



Comment.add('Comment', {
	comment: { type: String, wysiwyg: true, height: 300 },
});

Comment.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.isModified('publishedOn') && this.isModified('state') && this.state === 'published') {
		this.publishedOn = new Date();
	}
	next();
});



Comment.track = true;
Comment.defaultColumns = 'submission, publishedOn, comment';
Comment.register();