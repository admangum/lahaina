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
		alert(post.title);
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
		return _(this.posts).find(function(p){
			return p.slug === slug;
		});
	},
	getInitialState: function(){
		return this.posts;
	}
});