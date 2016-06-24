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
	name: { type: String, initial: true, index: true },
	commentState: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});



Comment.add('Comment', {
	comment: { type: String, wysiwyg: true, height: 300 },
});

Comment.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState === 'published') {
		this.publishedOn = new Date();
	}
	next();
});



Comment.track = true;
Comment.defaultColumns = 'name, publishedOn, commentState';
Comment.register();