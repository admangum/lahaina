import React from 'react';
import PostStore from '../stores/post.s';

export default React.createClass({
	render(){
		var post = PostStore.getPostBySlug(this.props.params.id);
		return (
			<article>
				<h1 className="post-title"><span dangerouslySetInnerHTML={{__html: post.title}}></span></h1>
				<div dangerouslySetInnerHTML={{__html: post.content}}/>
			</article>
		);
	}
});