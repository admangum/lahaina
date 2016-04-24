var React = require('react');
var IndexLink = require('react-router').IndexLink;

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<h1><IndexLink to="/">*</IndexLink></h1>
				{this.props.children}
			</div>
		);
	}
});