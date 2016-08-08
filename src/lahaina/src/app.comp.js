var React = require('react');
var Reflux = require('reflux');
var IndexLink = require('react-router').IndexLink;
var Footer = require('./footer/components/footer.comp');
var PostStore = require('./core/stores/post.store');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		this.listenTo(PostStore, this.onPostsChange);
	},
	onPostsChange: function(data){
		if(data.postData){
			this.setState({
				posts: data.postData.posts,
				selectedPost: data.selectedPost
			});
		}
	},
	getInitialState: function(){
		return {
			posts: [],
			selectedPost: null
		};
	},
	getFooter: function(posts){
		if(posts.length){
			return (<Footer list={posts} />);
		}
	},
	render: function(){
		var posts = this.state.posts || [];
		return (
			<div>
				<header>
					<h1><IndexLink to="1">*</IndexLink></h1>
				</header>
				{this.props.children}

			</div>
		);
	}
});
