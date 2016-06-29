var React = require('react');

module.exports = React.createClass({
    render: function() {
        if (this.props.loading) {
            return ( <li className="loading-indicator"><i className="icon-spin1 animate-spin"/></li> );
        }
        return (<li/>);
    }
});