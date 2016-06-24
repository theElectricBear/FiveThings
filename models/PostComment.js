var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
	Posts
	=====
 */

var PostComment = new keystone.List('PostComment', {
	label: 'Comments',
});

PostComment.add({
	name: { type: String, initial: true, index: true },
	realName: { type: String, initial: true, index: true },
	location: { type: String, initial: true, index: true },
	age: { type: String, initial: true, index: true },
	email: { type: String, initial: true, index: true },
	commentState: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});



PostComment.add('Five Things', {
	thing1: { type: String},
	thing2: { type: String},
	thing3: { type: String},
	thing4: { type: String},
	thing5: { type: String}
});

PostComment.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState === 'published') {
		this.publishedOn = new Date();
	}
	next();
});



PostComment.track = true;
PostComment.defaultColumns = 'name, publishedOn, commentState';
PostComment.register();