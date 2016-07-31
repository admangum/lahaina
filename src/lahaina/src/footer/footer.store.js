var _ = require('lodash'),
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
		http.get('/')
			.query({
				json: 'get_posts',
				post_type: 'post',
				ignore_sticky_posts: 0,
				'post__not_in[]': _.map(list, function(post){
					return post.id.toString();
				})
			})
			.end(_.bind(function(err, res){
				if(err){

				}else{
					this.data = res.body;
					this.dispatchListBasedContent(res.body);
				}
			}, this));
	},
	dispatchListBasedContent: function(data, list){
		this.trigger({
			content: {
				featured: data.posts.slice(0, 2),
				more: data.posts.slice(2)
			}
		});
	}


});