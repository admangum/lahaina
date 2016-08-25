var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var PostStore = require('../../core/post.store');
var PostTags = require('../../common/components/post-tags.comp');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var layout = require('../../common/utils/layout.utils');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		// this.onRouteChange(this.props);
		this.listenTo(PostStore, this.onPostStoreChange);
	},
	componentWillUnmount: function(){
		this.updateBodyClassName();
	},
	componentWillReceiveProps: function(props){
		if(props.location.action === 'POP' || props.location.pathname === '/'){
			this.onRouteChange(props);
		}
	},
	onPostStoreChange: function(data){
		if(data.post){
			var post = data.post;
			this.post = post;
			this.updateBodyClassName(post);
			if(this.hasCustomStylesheet(post)){
				require(['style!css!sass!xyz/' + post.id + '.scss'], function(){
					this.setState({
						ready: true
					});
				}.bind(this));
			}
			this.setState({
				ready: true
			});
		}
	},
	// onRouteChange: function(props){
	// 	PostStore.getPostBySlug(props.params.slug).then(_.bind(function(post){
	// 		this.post = post;
	// 		this.updateBodyClassName(post);
	// 		if(this.hasCustomStylesheet(post)){
	// 			require(['style!css!sass!xyz/' + props.params.id + '.scss'], function(){
	// 				this.setState({
	// 					ready: true
	// 				});
	// 			}.bind(this));
	// 		}
	// 		this.setState({
	// 			ready: true
	// 		});
	// 	}, this));
	// },
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
			<ReactCssTransitionGroup component="div" transitionName="post" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={1000} transitionLeaveTimeout={10}>
				<article key={'post-' + post.id} className="post">
					<div className="inner">
						<PostTags data={post.categories} type="category" />
						<h1 style={this.getTitleStyle()} className="post-title"><span dangerouslySetInnerHTML={{__html: post.title}}></span></h1>
						<div dangerouslySetInnerHTML={{__html: post.content}}/>
					</div>
				</article>
			</ReactCssTransitionGroup>
		);
	}
});