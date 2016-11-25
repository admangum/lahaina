var React = require('react');

module.exports = React.createClass({
    render: function() {
        var loading = this.props.loading;
        return ( <li className="loading-indicator" style={loading ? {} : {opacity: 0, zIndex: -10000}}><i className="icon-spin1 animate-spin"/></li> );
    }
});