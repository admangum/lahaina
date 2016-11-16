var React = require('react');
var Reflux = require('reflux');
var CoreActions = require('./core/core.actions');
var PostStore = require('./core/post.store');
var Mark = require('./common/components/mark.comp');

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
				<header className="site-header">
					<h1>
						<Mark location={this.props.location}/>
					</h1>
				</header>
				{this.props.children}
			</div>
		);
	}
});
