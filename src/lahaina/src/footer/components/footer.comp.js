var React = require('react'),
	Reflux = require('reflux'),
	Actions = require('../footer.actions'),
	Store = require('../footer.store'),
	PostTeaser = require('../../list/components/post-teaser.comp');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		this.listenTo(Store, this.onStoreUpdate);
		Actions.routeChanged(this.props.list, this.props.post);
	},
	componentWillReceiveProps: function(props){
		// Actions.routeChanged(props.list, props.post);
	},
	onStoreUpdate: function(data){
		this.setState({
			content: data.content
		});
	},
	getInitialState: function(){
		return {
			content: null
		};
	},
	getTeasers: function(posts){
		return _.map(posts, function(post){
			return <PostTeaser key={post.id} data={post} />
		});
	},
	getTaxonomyItems: function(list, type){
		return list.map(function(item){
			return (<li key={type + '-' + item.id} className={type}>{item.title}</li>);
		});
	},
	getTagItems: function(categories){
		return (<li className="tag"></li>);
	},
	render: function(){
		var content = this.state.content;


		return (content && <footer id="colophon" role="contentinfo">
	  <div className="inner">
	  	<div className="featured">
			<h3>Featured</h3>
			<div className="post-teaser-list">
				<ul>
					{this.getTeasers(content.posts[0])}
				</ul>
			</div>
			<div className="post-teaser-list">
				<ul>
					{this.getTeasers(content.posts[1])}
				</ul>
			</div>
		 </div>
		 <div className="taxonomy">
		 	<div className="categories">
			 	<h3>Categories</h3>
			 	<ul className="category-list">
			 		{this.getTaxonomyItems(content.categories, 'category')}
			 	</ul>
		 	</div>
		 	<div className="tags">
			 	<h3>Tags</h3>
			 	<ul className="tag-list">
			 		{this.getTaxonomyItems(content.tags, 'tag')}
			 	</ul>
		 	</div>
		 </div>
		<div className="site-info">
			<a href="http://wordpress.org/" title="Semantic Personal Publishing Platform">Proudly powered by WordPress</a>
		</div>
	  </div>
	</footer>);
	}
})