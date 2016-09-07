var React = require('react');
var Reflux = require('reflux');
var IndexLink = require('react-router').IndexLink;
var CoreActions = require('./core/core.actions');
var PostStore = require('./core/post.store');

module.exports = React.createClass({
	mixins: [Reflux.ListenerMixin],
	componentWillMount: function(){
		this.onRouteChange(this.props.params);
	},
	componentWillReceiveProps: function(props){
		if(props.location.action === 'POP' || props.location.pathname === '/'){
			this.onRouteChange(props.params);
		}
	},
	onRouteChange: function(params){
		CoreActions.routeChanged(params);
	},
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
