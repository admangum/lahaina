var React = require('react');
var IndexLink = require('react-router').IndexLink;

module.exports = React.createClass({
	render: function(){
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