var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	onClick: function(e){
		e.stopPropagation();
	},
	render: function() {
		function getCategoryItem(category){
			return (
				<li key={"category-" + category.id} className="post-category">
					<Link to={'category/' + category.slug}>{category.title}</Link>
				</li>
			);
		}
		return (
			<ul className="post-categories" onClick={this.onClick}>{this.props.data.map(getCategoryItem)}</ul>
		);
	}
});