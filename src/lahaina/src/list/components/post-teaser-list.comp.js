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
		if(!this.state.layout && posts){
			// because of transitions, some refs may linger
			// that should not be considered as part of new layout,
			// so only take refs for posts in this route (they're ordered!)
			refs = _.toArray(this.refs).slice(0, posts.length);
			this.setState({
				layout: utils.getLayoutInfo(refs)
			});
		}else if(this.state.firstLayout){
			_.defer(function(that){
				that.setState({
					firstLayout: false
				});
			}, this);
		}
	},

	onPostsChange: function(data){
		if(data.loading){
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

		this.setState({
			list: {},
			layout: null,
			loading: false
		});
	},

	getInitialState: function(){
		return {
			list: {},
			cols: utils.getColumnInfo(),
			layout: null,
			firstLayout: true,
			loading: true
		};
	},

	routeDidChange: function(routeParamsA, routeParamsB){
		var paramsA = _.omit(routeParamsA, ['page']),
			paramsB = _.omit(routeParamsB, ['page']);
		return !_.isEqual(paramsA, paramsB);
	},

	getClassName: function(firstLayout){
		return 'post-teaser-list' + (firstLayout ? ' first-layout' : '');
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
	getPaginationPath: function(params, index){
		var path = [];
		path.push(params.category ? 'category' : params.tag ? 'tag' : '');
		path.push(params.category || params.tag || '');
		path.push(index);
		return _.compact(path).join('/');
	},
	getPagination: function(pages, params){
		var pagination = [];
		if(pages > 1){
			_.times(pages, (index) => {
				pagination.push(<li key={index}>
					<Link to={this.getPaginationPath(params, index + 1)} activeClassName="active">{index + 1}</Link>
				</li>);
			});
		}
		return pagination.length > 1 ? (<ol>{pagination}</ol>) : null;
	},
	render: function() {
		var state = this.state,
			posts = state.list.posts || [],
			params = this.props.params,
			style = this.getStyle(state.layout, posts),
			className = this.getClassName(state.firstLayout);

		return (
			<div>
			<ReactCssTransitionGroup component="ul" className={className} style={style} transitionName="post-teaser" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={ListConfig.TRANSITION_OUT_DURATION}>
				{posts.map(function(post, i){
					return <PostTeaser ref={i} key={'post-teaser-' + post.id} data={post} layout={state.layout && state.layout[i]} cols={state.cols} onClick={this.onTeaserClick.bind(this, post)}/>;
				}, this)}
				<LoadingIndicator key="loading-indicator" loading={state.loading} />
			</ReactCssTransitionGroup>
			<div className="pagination">
				{this.getPagination(state.list.pages, params)}
			</div>
			</div>
		);
	}
});