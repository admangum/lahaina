var React = require('react');
var Reflux = require('reflux');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var PostTeaser = require('./post-teaser.comp');
var LoadingIndicator = require('../../common/components/loading.comp');
var PostStore = require('../../core/post.store');
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
		if(data.list){
			this.setState({
				list: data.list,
				post: data.post,
				layout: null,
				loading: false
			});
		}else{
			this.setState({
				loading: !!data.loading
			});
		}
	},

	onWindowResize: function(){
		this.setState({
			cols: utils.getColumnInfo(),
			layout: null
		});
	},
	getInitialState: function(){
		return {
			list: {},
			post: null,
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
		var l = utils.getLayoutHeight(layout),
			h = l.layoutHeight;// || l.previousLayoutHeight;
		try{
			return /*h ? */{ height: h};// : {};
		}catch(err){
			return {};
		}
	},
	render: function() {
		var state = this.state,
			post = state.post,
			posts = state.list.posts || [],
			params = this.props.params,
			style = this.getStyle(state.layout, posts),
			className = this.getClassName(state.firstLayout),
			getPaginationPath = function(params, index){
				var path = [];
				path.push(params.category ? 'category' : params.tag ? 'tag' : '');
				path.push(params.category || params.tag || '');
				path.push(index);
				return _.compact(path).join('/');
			},
			getPagination = function(pages){
				var pagination = [];
				if(pages > 1){
					_.times(state.list.pages, function(index){
						pagination.push(<li key={index}>
							<Link to={getPaginationPath(params, index + 1)} activeClassName="active">{index + 1}</Link>
						</li>);
					});
				}
				return pagination.length ? (<ol className="pagination">{pagination}</ol>) : null;
			};

		return (
			<div>
			<ReactCssTransitionGroup component="ul" className={className} style={style} transitionName="post-teaser" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={ListConfig.TRANSITION_OUT_DURATION}>
				{(post ? [] : posts).map(function(post, i){
					return <PostTeaser ref={i} key={'post-teaser-' + post.id} data={post} layout={state.layout && state.layout[i]} cols={state.cols}/>;
				}, this)}
				<LoadingIndicator key="loading-indicator" loading={state.loading} />
			</ReactCssTransitionGroup>
			{getPagination(state.list.pages)}
			</div>
		);
	}
});