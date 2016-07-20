var React = require('react');
var IndexLink = require('react-router').IndexLink;

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<h1><IndexLink to="1">*</IndexLink></h1>
				{this.props.children}
			</div>
		);
	}
});