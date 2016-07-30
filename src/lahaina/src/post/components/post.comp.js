var React = require('react');
var PostStore = require('../../core/stores/post.store');
var PostTags = require('../../common/components/post-tags.comp');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var Footer = require('../../footer/components/footer.comp');
var _ = require('lodash');
var layout = require('../../common/utils/layout.utils');
module.exports = React.createClass({
	componentWillMount: function(){
		this.onRouteChange(this.props);
	},
	componentWillUnmount: function(){
		this.updateBodyClassName();
	},
	componentWillReceiveProps: function(props){
		if(props.location.action === 'POP' || props.location.pathname === '/'){
			this.onRouteChange(props);
		}
	},
	onRouteChange: function(props){
		PostStore.getPostBySlug(props.params.id).then(_.bind(function(post){
			this.post = post;
			this.updateBodyClassName(post);
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
	updateBodyClassName: function(post){
		var className = document.body.className.replace(/post-[\w|-]+\s?/, '');
		document.body.className = post ? (className + ' post-' + post.slug) : className;
	},
	getInitialState: function(){
		return {
			ready: false
		};
	},
	getTitleStyle: function(){
		var w = layout.getPageInfo().w * 0.6;
		return {
			width: w ? Math.round(w) + 'px' : '100%'
		};
	},
	render: function(){
		var post = this.post;
		return this.state.ready && (
			<ReactCssTransitionGroup component="div" transitionName="post" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={1000} transitionLeaveTimeout={500}>
				<article key={post.id} className="post">
					<div className="inner">
						<PostTags data={post.categories} type="category" />
						<h1 style={this.getTitleStyle()} className="post-title"><span dangerouslySetInnerHTML={{__html: post.title}}></span></h1>
						<div dangerouslySetInnerHTML={{__html: post.content}}/>
					</div>
				</article>
				<Footer post={post} />
			</ReactCssTransitionGroup>
		);
	}
});