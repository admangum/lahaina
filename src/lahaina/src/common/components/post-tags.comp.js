var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	onClick: function(e){
		e.stopPropagation();
	},
	render: function() {
		function getTagItem(tag){
			return (
				<li key={"tag-" + tag.id} className="post-tag">
					<Link to={'tag/' + tag.slug}>#{tag.title}</Link>
				</li>
			);
		}
		return (
			<ul className="post-tags" onClick={this.onClick}>{this.props.data.map(getTagItem)}</ul>
		);
	}
});