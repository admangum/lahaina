var React = require('react');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var Link = require('react-router').Link;
var _ = require('lodash');
module.exports = React.createClass({
    getPaginationPath: function(params, index){
		var path = [];
		path.push(params.category ? 'category' : params.tag ? 'tag' : '');
		path.push(params.category || params.tag || '');
		path.push(index);
		return _.compact(path).join('/');
	},
    getPagination: function(props){
		var pages = _.times(props.pages, Number);
		return pages.map(_.bind(function(index) {
            return (<li key={index}>
                        <Link to={this.getPaginationPath(props.params, index + 1)} activeClassName="active">{index + 1}</Link>
                    </li>);
        }, this))
	},
    render: function() {
        var props = this.props,
            visible = !!(props.layout && props.pages > 1);

        return (<ReactCssTransitionGroup 
            component="div" 
            className={"pagination" + (visible ? '' : ' hidden')}
            transitionName="pagination" 
            transitionAppear={true} 
            transitionAppearTimeout={2000} 
            transitionEnterTimeout={2000} 
            transitionLeaveTimeout={2000}>
                <ol key="pagination">
					{this.getPagination(props)}
                </ol>
			</ReactCssTransitionGroup>);
    }
});