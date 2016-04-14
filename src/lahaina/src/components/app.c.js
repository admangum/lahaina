import React from 'react';
import {IndexLink} from 'react-router';

export default React.createClass({
	render(){
		return (
			<div>
				<h1><IndexLink to="/">*</IndexLink></h1>
				{this.props.children}
			</div>
		);
	}
});