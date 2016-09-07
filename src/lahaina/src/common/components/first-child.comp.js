var React = require('react');

module.exports = React.createClass({
    render(){
        var children = React.Children.toArray(this.props.children);
        return children[0] || null;
    }
});