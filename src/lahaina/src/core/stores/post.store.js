var _ = require('lodash');
var http = require('superagent');
var Reflux = require('reflux');
var Actions = require('../actions/core.actions');
var animation = require('../../common/utils/animation.utils');

module.exports = Reflux.createStore({
	listenables: [Actions],
	init: function(){
		this.posts = window.initialPosts.posts;
	},
	onPostSelected: function(post){
		this.posts = [];
		this.trigger({
			posts: this.posts,
			selectedPost: post
		});
	},
	onRouteChanged: function(routeParams){
		animation.scrollToTop().then(_.bind(function(){

			this.trigger({loading: true});

			if(routeParams.category){
				this.getPostsByCategory(routeParams.category);
			}else if(routeParams.tag){
				this.getPostsByTag(routeParams.tag);
			}else{
				this.posts = window.initialPosts.posts;
				this.trigger({
					posts: this.posts
				});
			}
		}, this));
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
				this.trigger({posts: this.posts});
			}, this));
	},
	getPostsByCategory: function(categorySlug){
		http.get('/')
			.query({
				json: 'get_category_posts',
				category_slug: categorySlug
			})
			.end(_.bind(function(err, res){
				if(err){
					return console.log(err);
				}
				this.posts = res.body.posts || [];
				this.trigger({
					posts: this.posts
				});
			}, this));
	},
	getPostsByTag: function(tagSlug){
		http.get('/')
			.query({
				json: 'get_tag_posts',
				tag_slug: tagSlug
			})
			.end(_.bind(function(err, res){
				if(err){
					return console.log(err);
				}
				this.posts = res.body.posts || [];
				this.trigger({posts: this.posts});
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