var _ = require('lodash');
var http = require('superagent');
var Reflux = require('reflux');
var Actions = require('../actions/core.actions');
var animation = require('../../common/utils/animation.utils');

module.exports = Reflux.createStore({
	listenables: [Actions],
	init: function(){
		this.postData = window.initialPostData;
	},
	onPostSelected: function(post){
		this.trigger({
			postData: this.postData,
			selectedPost: post
		});
	},
	onRouteChanged: function(routeParams){
		animation.scrollToTop().then(_.bind(function(){

			this.trigger({loading: true});

			if(routeParams.category){
				this.getPostsByCategory(routeParams);
			}else if(routeParams.tag){
				this.getPostsByTag(routeParams);
			}else if(routeParams.page){
				this.getPosts(routeParams);
			}else{
				this.postData = window.initialPostData;
				this.trigger({
					postData: this.postData
				});
			}
		}, this));
	},
	getPosts: function(routeParams){
		http.get('/')
			.query({
				json: 'get_posts',
				ignore_sticky: routeParams.page > 1,
				page: routeParams.page
			})
			.end(_.bind(function(err, res){
				if(err){
					return console.log(err);
				}
				this.postData = res.body || {};
				this.trigger({postData: this.postData});
			}, this));
	},
	getPostsByCategory: function(routeParams){
		http.get('/')
			.query({
				json: 'get_category_posts',
				category_slug: routeParams.category,
				page: routeParams.page
			})
			.end(_.bind(function(err, res){
				if(err){
					return console.log(err);
				}
				this.postData = res.body || {};
				this.trigger({
					postData: this.postData
				});
			}, this));
	},
	getPostsByTag: function(routeParams){
		http.get('/')
			.query({
				json: 'get_tag_posts',
				tag_slug: routeParams.tag,
				page: routeParams.page
			})
			.end(_.bind(function(err, res){
				if(err){
					return console.log(err);
				}
				this.postData = res.body || {};
				this.trigger({postData: this.postData});
			}, this));
	},
	getPostBySlug: function(slug){
		var post = _(this.postData).find(function(p){
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
		return this.postData;
	}
});