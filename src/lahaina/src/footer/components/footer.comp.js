var React = require('react'),
	Reflux = require('reflux'),
	Actions = require('../footer.actions'),
	Store = require('../footer.store');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		this.listenTo(Store, this.onStoreUpdate);
		Actions.routeChanged(this.props.routeParams, this.props.post);
	},
	// componentWillReceiveProps: function(props){

	// },
	onStoreUpdate: function(){

	},
	render: function(){
		var post = this.props.post;
		return (<footer id="colophon" role="contentinfo">
	  <div className="inner">
	  	<div>
			<h3>Featured</h3>
			<p>{post && post.title}</p>
		 </div>
		<div className="site-info">
			<a href="http://wordpress.org/" title="Semantic Personal Publishing Platform">Proudly powered by WordPress</a>
		</div>
	  </div>
	</footer>);
	}
})