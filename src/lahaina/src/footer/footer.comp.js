var React = require('react'),
	Reflux = require('reflux'),
	ReactCssTransitionGroup = require('react-addons-css-transition-group'),
	FooterStore = require('./footer.store'),
	Actions = require('../core/core.actions'),
	PostTeaser = require('../list/components/post-teaser.comp'),
	Icon = require('../common/components/icon.comp'),
	FirstChildComp = require('../common/components/first-child.comp'),
	animation = require('../common/utils/animation.utils');

var PostTags = require('../common/components/post-tags.comp');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		this.listenTo(FooterStore, this.onStoreUpdate);
	},
	onStoreUpdate: function(data){
		this.setState({
			content: data.content
		});
	},
	getInitialState: function(){
		return {
			content: null
		};
	},
	getTeasers: function(content, grouping){
		var posts = content ? content.posts[grouping] : [];
		return _.map(posts, (post) => {
			return <PostTeaser key={post.id} data={post} onClick={this.onTeaserClick.bind(this, post)} />
		});
	},
	getTaxonomyItems: function(list, type){
		list = list || [];
		return list.map(function(item){
			return (<li key={type + '-' + item.id} className={type + '-' + item.slug + ' post-' + type}>{item.title}</li>);
		});
	},
	getTagItems: function(categories){
		return (<li className="tag"></li>);
	},

	getFeaturedLabel: function(content){
		content = content || {};
		switch(content.type){
			case 'POST':
				return 'Related';
			case 'LIST':
				return 'Featured';
			default: 
				return 'Featured';
		}
	},

	onTeaserClick: function(post){
		// animation.scrollToTop().then(function(){
		// 	location.hash = '/post/' + post.slug;
		// });
		_.delay(function(){
			// animation.scrollToTop().then(function(){
				location.hash = '/post/' + post.slug;
			// });
		}, 400);

		Actions.postSelected();
	},

	getFooter: function(content){
		if(content){
			return (
				<footer ref="footer" id="colophon" role="contentInfo">
	  <div className="inner">
	  	<div className="featured section">
	  		<div className="inner">
				<h3>{this.getFeaturedLabel(content)}</h3>
				<div className="post-teaser-list">
					<ul>
						{this.getTeasers(content, 0)}
					</ul>
				</div>
				<div className="post-teaser-list">
					<ul>
						{this.getTeasers(content, 1)}
					</ul>
				</div>
			</div>
		 </div>
		 <div className="taxonomy section">
		 	<div className="inner">
			 	<div className="categories">
				 	<h3>Categories</h3>
					 <PostTags data={content && content.categories} type="category" />
			 	</div>
			 	<div className="tags">
				 	<h3>Tags</h3>
				 	<PostTags data={content && content.tags} type="tag" />
			 	</div>
		 	</div>
		 </div>
		 <div className="about section">
		 	<div className="inner">
			 	<h3>What is this?</h3>
			 	<p>I'm Adam, this is my place to post things I'm working on, interested in, or whatever!</p>
		 	</div>
		 </div>
		 <div className="elsewhere section">
		 	<div className="inner">
			 	<h3>Elsewhere</h3>
			 	<ul>
			 		<li>
			 			<a href="https://github.com/admangum">
			 				<Icon glyph={require('../common/img/github-mark.svg')}/>
			 			</a>
			 		</li>
			 	</ul>
		 	</div>
		 </div>
		<div className="site-info">
			<a href="http://wordpress.org/" title="Semantic Personal Publishing Platform">Proudly powered by WordPress</a>
		</div>
	  </div>
	  </footer>);
		}
		return null;
	},
	render: function(){
		var content = this.state.content;
		return (
			<ReactCssTransitionGroup component={FirstChildComp} transitionName="footer" transitionAppear={true} transitionAppearTimeout={1200} transitionEnterTimeout={1200} transitionLeaveTimeout={800}>
			{this.getFooter(content)}
			</ReactCssTransitionGroup>
		);
	}
})