var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	onClick: function(e){
		e.stopPropagation();
	},
	render: function() {
		var type = this.props.type;

		function getItem(item){
			return (
				<li key={type + '-' + item.id} className={('post-' + type) + ' ' + getTaxonomyClasses(item)}>
					<Link to={type + '/' + item.slug + '/1'}>{item.title}</Link>
				</li>
			);
		}

		function getTaxonomyClasses(item){
			return type + '-' + item.slug;
		}

		return (
			<ul className={'post-classification-list post-' + type + '-list'} onClick={this.onClick}>{this.props.data.map(getItem)}</ul>
		);
	}
});