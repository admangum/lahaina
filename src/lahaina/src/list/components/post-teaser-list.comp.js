var React = require('react');
var Reflux = require('reflux');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var PostTeaser = require('./post-teaser.comp');
var Footer = require('../../common/components/footer.comp');
var LoadingIndicator = require('../../common/components/loading.comp');
var PostStore = require('../../core/stores/post.store');
var Actions = require('../../core/actions/core.actions');
var Link = require('react-router').Link;
var utils = require('../../common/utils/layout.utils');
var _ = require('lodash');
var TRANSITION_OUT_DURATION = 1150;
module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		this.listenTo(PostStore, this.onPostsChange);
		this.onWindowResize = _.debounce(this.onWindowResize, 300);
		window.addEventListener('resize', this.onWindowResize);
		this.onRouteChange(this.props.routeParams);
	},
	componentWillUnmount: function(){
		window.removeEventListener('resize', this.onWindowResize);
	},
	componentDidUpdate: function(){
		var posts = this.state.postData.posts,
			refs;
		if(!this.state.layout && posts){
			// because of transitions, some refs may linger
			// that should not be considered as part of new layout,
			// so only take refs for posts in this route
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
			return {
				height: utils.getLayoutHeight(layout)
			};
		}catch(err){
			return {};
		}
	},
	render: function() {
		var state = this.state,
			posts = state.postData.posts || [],
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
					_.times(state.postData.pages, function(index){
						pagination.push(<li key={index}>
							<Link to={getPaginationPath(params, index + 1)} activeClassName="active">{index + 1}</Link>
						</li>);
					});
				}
				return pagination.length ? (<ol className="pagination">{pagination}</ol>) : null;
			},
			getFooter = function(){
				if(posts.length){
					return (<Footer />);
				}
			};
		return (
			<div>
			<ReactCssTransitionGroup component="ul" className={className} style={style} transitionName="post-teaser" transitionAppear={true} transitionAppearTimeout={750} transitionEnterTimeout={500} transitionLeaveTimeout={TRANSITION_OUT_DURATION}>
				{posts.map(function(post, i){
					return <PostTeaser ref={i} key={post.id} data={post} layout={state.layout && state.layout[i]} cols={state.cols}/>;
				}, this)}
				<LoadingIndicator key="loading-indicator" loading={state.loading} />
			</ReactCssTransitionGroup>
			{getPagination(state.postData.pages)}
			{getFooter()}
			</div>
		);
	}
});