var _ = require('lodash');
var http = require('superagent');
var Reflux = require('reflux');
var Actions = require('../actions/core.actions');

module.exports = Reflux.createStore({
	listenables: [Actions],
	init: function(){
		this.posts = window.initialPosts;
	},
	onPostSelected: function(post){
		this.posts = [];
		this.trigger(this.posts, post);
	},
	onRouteChanged: function(categorySlug){
		if(categorySlug){
			this.getPostsByCategorySlug(categorySlug);
		}else{
			this.getPosts();
		}
	},
	getPosts: function(options){
		http.get('/')
			.query({
				json: 1
			})
			.end(_.bind(function(err, res){
				if(err){
					return console.log(err);
				}
				this.posts = res.body.posts;
				this.trigger(this.posts);
			}, this));
	},
	getPostsByCategorySlug: function(categorySlug){
		http.get('/')
			.query({
				json: 'get_category_posts',
				category_slug: categorySlug
			})
			.end(_.bind(function(err, res){
				if(err){
					return console.log(err);
				}
				this.posts = res.body.posts;
				this.trigger(this.posts);
			}, this));
	},
	getPostBySlug: function(slug){
		var post = _(this.posts).find(function(p){
			return p.slug === slug;
		});
		return new Promise(function(resolve, reject){
			if(post){
				return resolve(post);
			}
			http.get('/')
				.query({
					json: 'get_post',
					post_slug: slug
				})
				.end(function(err, res){
					if(err){
						return reject(err);
					}
					resolve(res.body.post);
				});
		});
	},
	getInitialState: function(){
		return this.posts;
	}
});