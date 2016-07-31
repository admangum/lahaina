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
	render: function(){
		var content = this.state.content;


		return (content && <footer id="colophon" role="contentinfo">
	  <div className="inner">
	  	<div>
			<h3>Featured</h3>
			<ul className="post-teaser-list">
				{this.getTeasers(content.featured)}
			</ul>
		 </div>
		<div className="site-info">
			<a href="http://wordpress.org/" title="Semantic Personal Publishing Platform">Proudly powered by WordPress</a>
		</div>
	  </div>
	</footer>);
	}
})