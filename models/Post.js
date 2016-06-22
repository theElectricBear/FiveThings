var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	name: { type: String, required: true },
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.register();
