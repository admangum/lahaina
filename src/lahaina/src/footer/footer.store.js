var _ = require('lodash'),
	httpUtils = require('../common/utils/http.utils'),
	http = require('superagent'),
	Reflux = require('reflux'),
	Actions = require('./footer.actions');

module.exports = Reflux.createStore({
	listenables: [Actions],
	init: function(){
		this.data = {};
	},
	onRouteChanged: function(list, post){
		if(list){
			this.getListBasedContent(list);
		}
	},
	getListBasedContent: function(list){
		var store = this,
			content = [];

		content.push(http.get('/')
			.query({
				json: 'get_posts',
				post_type: 'post',
				ignore_sticky_posts: 0,
				count: 4,
				'post__not_in[]': _.map(list, function(post){
					return post.id.toString();
				})
			}));

		content.push(http.get('/')
			.query({
				json: 'get_category_index'
			}));

		content.push(http.get('/')
			.query({
				json: 'get_tag_index'
			}));

		httpUtils.request.all(content).done(_.bind(this.dispatchListBasedContent, this));
	},
	dispatchListBasedContent: function(posts, categories, tags){
		var content = {},
			half;

		posts = httpUtils.response.get(posts, 'posts');
		categories = httpUtils.response.get(categories, 'categories');
		tags = httpUtils.response.get(tags, 'tags');

		half = posts.length > 1 ? Math.ceil(posts.length / 2) : 1;

		this.trigger({
			content: {
				posts: [
					posts.slice(0, half),
					posts.slice(half)
				],
				categories: categories,
				tags: tags
			}
		});
	}


});