var React = require('react');
var Reflux = require('reflux');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var PostTeaser = require('./post-teaser.comp');
var LoadingIndicator = require('../../common/components/loading.comp');
var PostStore = require('../../core/stores/post.store');
var Actions = require('../../core/actions/core.actions');
var utils = require('../../common/utils/layout.utils');
var _ = require('lodash');
var TRANSITION_OUT_DURATION = 1150;
module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		this.listenTo(PostStore, this.onPostsChange);
		this.onWindowResize = _.debounce(this.onWindowResize, 300);
		this.onWindowScroll = _.debounce(this.onWindowScroll, 300);
		window.addEventListener('resize', this.onWindowResize);
		window.addEventListener('scroll', this.onWindowScroll);

		this.onRouteChange(this.props.routeParams);

	},
	componentWillUnmount: function(){
		window.removeEventListener('resize', this.onWindowResize);
		window.removeEventListener('scroll', this.onWindowScroll);
	},
	componentDidUpdate: function(){
		if(!this.state.layout){
			this.setState({
				layout: utils.getLayoutInfo(this.refs)
			});
		}else if(this.state.firstLayout){
			_.defer(function(that){
				that.setState({
					firstLayout: false
				});
			}, this);

		}
	},
	componentWillReceiveProps: function(props){
		if(props.location.action === 'POP' || props.location.pathname === '/'){
			this.onRouteChange(props.routeParams);
		}
	},
	onPostsChange: function(data){
		if(data.postData){
			this.setState({
				postData: data.postData,
				layout: null,
				loading: false
			});
		}else{
			this.setState({
				loading: !!data.loading
			});
		}
		if(data.selectedPost){
			_.delay(function(){
				location.hash = '/post/' + data.selectedPost.slug;
			}, TRANSITION_OUT_DURATION);
		}
	},
	onRouteChange: function(routeParams){
		Actions.routeChanged(routeParams);
	},
	onWindowResize: function(){
		this.setState({
			cols: utils.getColumnInfo(),
			layout: null
		});
	},
	onWindowScroll: function(e){
		console.log('scroll');
	},
	getInitialState: function(){
		return {
			postData: {},
			cols: utils.getColumnInfo(),
			layout: null,
			firstLayout: true,
			loading: true
		};
	},
	getClassName: function(firstLayout){
		return 'post-teaser-list' + (firstLayout ? ' first-layout' : '');
	},
	getStyle: function(layout, posts){
		try{
			var last = layout[posts.length - 1];
			return {height: last.y + last.h};
		}catch(err){
			return {};
		}
	},
	render: function() {
		var state = this.state,
			posts = state.postData.posts || [],
			style = this.getStyle(state.layout, posts),
			className = this.getClassName(state.firstLayout);

		return (
			<ReactCssTransitionGroup component="ul" className={className} style={style} transitionName="post-teaser" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={TRANSITION_OUT_DURATION}>
				{posts.map(function(post, i){
					return <PostTeaser ref={i} key={post.id} data={post} layout={state.layout && state.layout[i]} cols={state.cols}/>;
				}, this)}
				<LoadingIndicator key="loading-indicator" loading={state.loading} />
			</ReactCssTransitionGroup>
		);
	}
});