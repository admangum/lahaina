import React from 'react';
import PostStore from '../stores/post.s';

export default React.createClass({
	render(){
		var post = PostStore.getPostBySlug(this.props.params.id);
		return (
			<article>
				<h1 dangerouslySetInnerHTML={{__html: post.title}}/>
				<div dangerouslySetInnerHTML={{__html: post.content}}/>
			</article>
		);
	}
});