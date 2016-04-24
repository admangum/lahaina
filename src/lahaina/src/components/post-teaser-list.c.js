var React = require('react');
var Reflux = require('reflux');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var PostTeaser = require('./post-teaser.c');
var PostStore = require('../stores/post.s');
var Actions = require('../actions/actions');

module.exports = React.createClass({
	mixins: [Reflux.connect(PostStore, 'posts')],
	componentWillMount: function(){
		this.update(this.props);
	},
	componentWillReceiveProps: function(props){
		if(props.location.action === 'POP' || props.location.pathname === '/'){
			this.update(props);
		}
	},
	update: function(props){
		Actions.routeChanged(props.params.category);
	},
	render: function() {
		function getPost(post){
			return <PostTeaser key={post.id} data={post}/>;
		};
		return (
			<ReactCssTransitionGroup component="ul" className="post-teaser-list" transitionName="post-teaser" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				{this.state.posts.map(getPost)}
			</ReactCssTransitionGroup>
		);
	}
});