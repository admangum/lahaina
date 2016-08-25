var _ = require('lodash');
var http = require('superagent');
var Reflux = require('reflux');
var Actions = require('./core.actions');
var animation = require('../common/utils/animation.utils');
var DEFAULT_ERROR = 'Ouch, something just went terribly wrong';

module.exports = Reflux.createStore({
	listenables: [Actions],
	init: function(){
		this.data = {
			list: window.initialPostData
		};
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
			}else if(routeParams.slug){
				this.getPostBySlug(routeParams.slug);
			}else{
				this.data.list = window.initialPostData;
				this.trigger({
					list: this.data.list
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
					return this.trigger({error: DEFAULT_ERROR});
				}
				this.data.list = res.body || {};
				this.trigger({list: this.data.list});
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
					return this.trigger({error: DEFAULT_ERROR});
				}
				this.data.list = res.body || {};
				this.trigger({
					list: this.data.list
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
					return this.trigger({error: DEFAULT_ERROR});
				}
				this.data.list = res.body || {};
				this.trigger({list: this.data.list});
			}, this));
	},
	getPostBySlug: function(slug){
		var store = this,
			post = _(this.postData).find(function(p){
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
					store.trigger({post: res.body.post});
				});
		});
	},
	getInitialState: function(){
		return this.data.list;
	}
});