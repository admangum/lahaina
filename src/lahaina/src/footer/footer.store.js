var _ = require('lodash'),
	promise = require('../common/utils/promise.utils'),
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
			content = {};
		var postPromise = http.get('/')
			.query({
				json: 'get_posts',
				post_type: 'post',
				ignore_sticky_posts: 0,
				'post__not_in[]': _.map(list, function(post){
					return post.id.toString();
				})
			})
			.end(function(err, res){
				if(err){

				}else{
					content = {
						featured: res.body.posts.slice(0, 2),
						more: res.body.posts.slice(2)
					};
					return http.get('/')
						.query({
							json: ''
						})
				}
			});
		promise.all(postPromise).done(function(results){
			store.dispatchListBasedContent(results[0].value.body, list);
		});
	},
	dispatchListBasedContent: function(data, list){
		var posts = data.posts || [];
		this.trigger({
			content: {
				featured: posts.slice(0, 2),
				more: posts.slice(2)
			}
		});
	}


});