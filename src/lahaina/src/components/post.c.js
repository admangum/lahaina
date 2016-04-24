import React from 'react';
import PostStore from '../stores/post.s';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({
	render(){
		var post = PostStore.getPostBySlug(this.props.params.id);
		return (
			<ReactCssTransitionGroup component="div" transitionName="post" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<article key={post.id} className="post">
					<h1 className="post-title"><span dangerouslySetInnerHTML={{__html: post.title}}></span></h1>
					<div dangerouslySetInnerHTML={{__html: post.content}}/>
				</article>
			</ReactCssTransitionGroup>
		);
	}
});