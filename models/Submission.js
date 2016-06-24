var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
	Posts
	=====
 */

var Submission = new keystone.List('Submission', {
	label: 'Submissions',
});

Submission.add({
	name: { type: String, initial: true, index: true },
	realName: { type: Types.Select, options: ['Yes', 'No'], default: 'published', index: true },
	location: { type: String, initial: true, index: true },
	age: { type: String, initial: true, index: true },
	email: { { type: Types.Email, displayGravatar: false, initial: true, index: true  },
	state: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});



Submission.add('Five Things', {
	thing1: { type: String},
	thing2: { type: String},
	thing3: { type: String},
	thing4: { type: String},
	thing5: { type: String}
});

Submission.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.isModified('publishedOn') && this.isModified('state') && this.state === 'published') {
		this.publishedOn = new Date();
	}
	next();
});



Submission.track = true;
Submission.defaultColumns = 'author, publishedOn, state';
Submission.register();