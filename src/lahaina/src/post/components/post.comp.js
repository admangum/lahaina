var React = require('react');
var PostStore = require('../../core/stores/post.store');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var _ = require('lodash');
module.exports = React.createClass({
	componentWillMount: function(){
		this.onRouteChange(this.props);
	},
	componentWillReceiveProps: function(props){
		if(props.location.action === 'POP' || props.location.pathname === '/'){
			this.onRouteChange(props);
		}
	},
	onRouteChange: function(props){
		PostStore.getPostBySlug(props.params.id).then(_.bind(function(post){
			this.post = post;
			if(this.hasCustomStylesheet(post)){
				require(['style!css!sass!xyz/' + props.params.id + '.scss'], function(){
					this.setState({
						ready: true
					});
				}.bind(this));
			}
			this.setState({
				ready: true
			});
		}, this));
	},
	hasCustomStylesheet: function(post){
		try{
			return post.custom_fields.custom_stylesheet[0] === '1';
		}catch(err){
			return false;
		}
	},
	getInitialState: function(){
		return {
			ready: false
		};
	},
	render: function(){
		var post = this.post;
		return this.state.ready && (
			<ReactCssTransitionGroup component="div" transitionName="post" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
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