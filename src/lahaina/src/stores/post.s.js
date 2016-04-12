import _ from 'lodash';
import http from 'superagent';
import Reflux from 'reflux';
import Actions from '../actions/actions';

module.exports = Reflux.createStore({
	listenables: [Actions],
	init(){
		this.posts = window.initialPosts;
	},
	onPostSelected(post){
		alert(post.title);
	},
	getPosts(options){
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
	getPostsByCategorySlug(categorySlug){
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
	getPostBySlug(slug){
		return _(this.posts).find((p) => {
			return p.slug === slug;
		});
	},
	getInitialState(){
		return this.posts;
	},
	onRouteChanged(categorySlug){
		if(categorySlug){
			this.getPostsByCategorySlug(categorySlug);
		}else{
			this.getPosts();
		}
	}
});