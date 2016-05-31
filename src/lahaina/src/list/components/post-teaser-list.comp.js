var React = require('react');
var Reflux = require('reflux');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var PostTeaser = require('./post-teaser.comp');
var PostStore = require('../../core/stores/post.store');
var Actions = require('../../core/actions/core.actions');
var utils = require('../../common/utils/layout.utils');
var _ = require('lodash');
var TRANSITION_OUT_DURATION = 1150;
module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin/*Reflux.connect(PostStore, 'posts')*/],
	componentWillMount: function(){
		this.onWindowResize = _.debounce(this.onWindowResize, 300);
		this.listenTo(PostStore, this.onPostsChange);
		window.addEventListener('resize', this.onWindowResize);
		this.onRouteChange(this.props);
	},
	componentWillUnmount: function(){
		window.removeEventListener('resize', this.onWindowResize);
	},
	componentDidUpdate: function(){
		if(!this.state.layout){
			this.setState({
				layout: utils.getLayoutInfo(this.refs)
			});
		}else if(this.state.firstLayout){
			this.setState({
				firstLayout: false
			});
		}
	},
	componentWillReceiveProps: function(props){
		if(props.location.action === 'POP' || props.location.pathname === '/'){
			this.onRouteChange(props);
		}
	},
	onPostsChange: function(posts, selectedPost){
		this.setState({
			posts: posts,
			layout: null
		});
		if(selectedPost){
			_.delay(function(){
				location.hash = '/post/' + selectedPost.slug;
			}, TRANSITION_OUT_DURATION);
		}
	},
	onRouteChange: function(props){
		Actions.routeChanged(props.routeParams);
	},
	onWindowResize: function(){
		this.setState({
			cols: utils.getColumnInfo(),
			layout: null
		});
	},
	getInitialState: function(){
		return {
			posts: [],//PostStore.getInitialState(),
			cols: utils.getColumnInfo(),
			layout: null,
			firstLayout: true
		};
	},
	getClassName: function(){
		return 'post-teaser-list' + (this.state.firstLayout ? ' no-layout-transition' : '');
	},
	render: function() {
		var state = this.state,
			className = this.getClassName();
		return (
			<ReactCssTransitionGroup component="ul" className={className} transitionName="post-teaser" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={TRANSITION_OUT_DURATION}>
				{this.state.posts.map(function(post, i){
					return <PostTeaser ref={i} key={post.id} data={post} layout={state.layout && state.layout[i]} cols={state.cols}/>;
				}, this)}
			</ReactCssTransitionGroup>
		);
	}
});