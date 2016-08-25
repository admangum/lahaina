var _ = require('lodash'),
	httpUtils = require('../common/utils/http.utils'),
	http = require('superagent'),
	Reflux = require('reflux');

var PostStore = require('../core/post.store');

module.exports = Reflux.createStore({
	init: function(){
		this.data = {};
		this.listenTo(PostStore, this.onPostStoreChange);
	},
	onPostStoreChange: function(data){
		if(data.list){
			this.getListBasedContent(data.list);
		}else if(data.post){
			this.getPostBasedContent(data.post);
		}else if(data.loading){
			this.trigger({content: null});
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
				'post__not_in[]': _.map(list.posts, function(post){
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
	getPostBasedContent: function(post){
		var content = [],
			query = {
				json: 'get_posts',
				post_type: 'post',
				ignore_sticky_posts: 0,
				count: 6,
				'post__not_in[]': [post.id]
			};

		if(post.categories.length){
			query['category__in[]'] = _(post.categories).map(function(cat){
				return cat.id.toString();
			});
		}

		content.push(http.get('/')
				.query(query));

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