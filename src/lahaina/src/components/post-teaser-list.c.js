import React from 'react';
import Reflux from 'reflux';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import PostTeaser from './post-teaser.c';
import PostStore from '../stores/post.s';
import Actions from '../actions/actions';

module.exports = React.createClass({
	mixins: [Reflux.connect(PostStore, 'posts')],
	componentWillMount(){
		this.update(this.props);
	},
	componentWillReceiveProps(props){
		if(props.location.action === 'POP'){
			this.update(props);
		}
	},
	update(props){
		Actions.routeChanged(props.params.category);
	},
	render() {
		var getPost = (post) => {
			return <PostTeaser key={post.id} data={post}/>;
		};
		return (
			<ReactCssTransitionGroup component="ul" transitionName="post-teaser" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				{this.state.posts.map(getPost)}
			</ReactCssTransitionGroup>
		);
	}
});