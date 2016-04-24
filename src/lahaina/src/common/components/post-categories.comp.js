var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function() {
		function getCategoryItem(category){
			return (
				<li key={"category-" + category.id} className="post-category">
					<Link to={'category/' + category.slug}>{category.title}</Link>
				</li>
			);
		}
		return (
			<ul className="post-categories">{this.props.data.map(getCategoryItem)}</ul>
		);
	}
});