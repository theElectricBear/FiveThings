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
	name: { type: String, initial: true, index: true},
	realName: { type: Types.Select, numeric: true, options: [{ value: 1, label: 'Yes' }, { value: 0, label: 'No' }], index: true },
	location: { type: String, initial: true, index: true },
	age: { type: String, initial: true, index: true },
	email: { type: Types.Email, displayGravatar: false, initial: true, index: true  },
	state: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});



Submission.add('Five Things', {
	thing1: { type:Types.Html},
	thing2: { type:Types.Html},
	thing3: { type:Types.Html},
	thing4: { type:Types.Html},
	thing5: { type:Types.Html}
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