var React = require('react');
var PostStore = require('../../core/stores/post.store');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
	componentWillMount: function(){
		this.post = PostStore.getPostBySlug(this.props.params.id);
		if(this.post.custom_fields.custom_stylesheet){
			require(['style!css!sass!xyz/' + this.props.params.id + '.scss'], function(){
				this.setState({
					ready: true
				});
			}.bind(this));
		}
		this.setState({
			ready: true
		});
	},
	getInitialState: function(){
		return {
			ready: false
		};
	},
	render: function(){
		var post = this.post;
		return this.state.ready && (
			<ReactCssTransitionGroup component="div" transitionName="post" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<article key={post.id} className={"post " + post.slug}>
					<div className="inner">
						<h1 className="post-title"><span dangerouslySetInnerHTML={{__html: post.title}}></span></h1>
						<div dangerouslySetInnerHTML={{__html: post.content}}/>
					</div>
				</article>
			</ReactCssTransitionGroup>
		);
	}
});