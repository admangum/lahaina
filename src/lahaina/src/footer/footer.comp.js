var React = require('react'),
	Reflux = require('reflux'),
	FooterStore = require('./footer.store'),
	PostTeaser = require('../list/components/post-teaser.comp'),
	Icon = require('../common/components/icon.comp');

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
	getTeasers: function(posts){
		return _.map(posts, function(post){
			return <PostTeaser key={post.id} data={post} context="FOOTER" />
		});
	},
	getTaxonomyItems: function(list, type){
		return list.map(function(item){
			return (<li key={type + '-' + item.id} className={type + '-' + item.slug + ' post-' + type}>{item.title}</li>);
		});
	},
	getTagItems: function(categories){
		return (<li className="tag"></li>);
	},
	getFeatured: function(content){

	},
	render: function(){
		var content = this.state.content;


		return (content && <footer id="colophon" role="contentinfo">
	  <div className="inner">
	  	<div className="featured section">
	  		<div className="inner">
				<h3>{this.props.post ? 'Related' : 'Featured'}</h3>
				<div className="post-teaser-list">
					<ul>
						{this.getTeasers(content.posts[0])}
					</ul>
				</div>
				<div className="post-teaser-list">
					<ul>
						{this.getTeasers(content.posts[1])}
					</ul>
				</div>
			</div>
		 </div>
		 <div className="taxonomy section">
		 	<div className="inner">
			 	<div className="categories">
				 	<h3>Categories</h3>
				 	<ul className="category-list post-taxonomy-list">
				 		{this.getTaxonomyItems(content.categories, 'category')}
				 	</ul>
			 	</div>
			 	<div className="tags">
				 	<h3>Tags</h3>
				 	<ul className="tag-list post-taxonomy-list">
				 		{this.getTaxonomyItems(content.tags, 'tag')}
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