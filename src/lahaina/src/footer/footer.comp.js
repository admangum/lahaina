var React = require('react'),
	Reflux = require('reflux'),
	FooterStore = require('./footer.store'),
	PostTeaser = require('../list/components/post-teaser.comp'),
	Icon = require('../common/components/icon.comp'),
	animation = require('../common/utils/animation.utils');

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
		animation.scrollToTop().then(function(){
			location.hash = '/post/' + post.slug;
		});
	},

	render: function(){
		var content = this.state.content;
		return (<footer id="colophon" role="contentinfo" style={content ? null : {visibility:'hidden'}}>
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
				 	<ul className="category-list post-taxonomy-list">
				 		{this.getTaxonomyItems(content && content.categories, 'category')}
				 	</ul>
			 	</div>
			 	<div className="tags">
				 	<h3>Tags</h3>
				 	<ul className="tag-list post-taxonomy-list">
				 		{this.getTaxonomyItems(content && content.tags, 'tag')}
				 	</ul>
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
})