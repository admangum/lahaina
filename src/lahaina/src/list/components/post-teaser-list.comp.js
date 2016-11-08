var React = require('react');
var Reflux = require('reflux');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var PostTeaser = require('./post-teaser.comp');
var LoadingIndicator = require('../../common/components/loading.comp');
var PostStore = require('../../core/post.store');
var Actions = require('../../core/core.actions');
var Link = require('react-router').Link;
var utils = require('../../common/utils/layout.utils');
var _ = require('lodash');
var ListConfig = require('../config/list.config');
var Footer = require('../../footer/footer.comp');
var IndexLink = require('react-router').IndexLink;
var Mark = require('../../common/components/mark.comp');
var Pagination = require('./pagination.comp');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		this.listenTo(PostStore, this.onPostsChange);
		this.onWindowResize = _.debounce(this.onWindowResize, 300);
		window.addEventListener('resize', this.onWindowResize);
	},
	componentWillUnmount: function(){
		window.removeEventListener('resize', this.onWindowResize);
	},

	componentWillUpdate: function(params, state){
		if(this.routeDidChange(params.routeParams, state.routeParams)){
			// when the route changes, we don't know how many
			// pages there will be until the new content loads
			// so assume there's only one and hide the pagination
			// for now until the content is loaded
			state.list.pages = 1;
			state.routeParams = params.routeParams;
		}
	},

	componentDidUpdate: function(){
		var posts = this.state.list.posts,
			refs;
			var that = this;
		if(!this.state.layout && posts){
			// because of transitions, some refs may linger
			// that should not be considered as part of new layout,
			// so only take refs for posts in this route (they're ordered!)
			refs = _.toArray(this.refs).slice(0, posts.length);
			this.setState({
				layout: utils.getLayoutInfo(refs)
			});
		}
	},

	onPostsChange: function(data){
		if(data.transition){
			this.setState({
				list: {},
				layout: null,
				loading: false
			});
		}else if(data.loading){
			this.setState({
				loading: !!data.loading
			});
		}else{
			this.setState({
				list: data.list || {},
				layout: null,
				loading: false,
				routeParams: this.props.routeParams
			});
		}
	},

	onWindowResize: function(){
		this.setState({
			cols: utils.getColumnInfo(),
			layout: null
		});
	},

	onTeaserClick: function(post){
		_.delay(function(){
			location.hash = '/post/' + post.slug;
		}, ListConfig.TRANSITION_OUT_DURATION);

		Actions.postSelected();
	},

	getInitialState: function(){
		return {
			list: {},
			cols: utils.getColumnInfo(),
			layout: null,
			loading: true
		};
	},

	routeDidChange: function(routeParamsA, routeParamsB){
		var paramsA = _.omit(routeParamsA, ['page']),
			paramsB = _.omit(routeParamsB, ['page']);
		return !_.isEqual(paramsA, paramsB);
	},
	getStyle: function(layout, posts){
		var l = utils.getLayoutHeight(layout),
			h = l.layoutHeight || l.previousLayoutHeight;
		try{
			return /*h ? */{ height: h};// : {};
		}catch(err){
			return {};
		}
	},
	render: function() {
		var state = this.state,
			posts = state.list.posts || [],
			style = this.getStyle(state.layout, posts);

		return (
			<div>
				<ReactCssTransitionGroup component="ul" className="post-teaser-list" style={style} transitionName="post-teaser" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={ListConfig.TRANSITION_OUT_DURATION}>
					{posts.map(function(post, i){
						return <PostTeaser ref={i} key={'post-teaser-' + post.id} data={post} layout={state.layout && state.layout[i]} cols={state.cols} onClick={this.onTeaserClick.bind(this, post)}/>;
					}, this)}
					<LoadingIndicator key="loading-indicator" loading={state.loading} />
				</ReactCssTransitionGroup>
				<Pagination pages={state.list.pages} params={this.props.params} layout={state.layout}/>
				<Footer />
			</div>
		);
	}
});