var React = require('react');
module.exports = React.createClass({
    getClassName: function(){
        return this.props.location.pathname.match(/^\/post\//) ? 'back' : '';
    },
    render: function(){
        return (
            <svg className={this.getClassName()} viewBox="0 0 67.668 39.936"><polygon style={{fill:'#2d2d2d'}} points="65.36 39.94 43.42 1.94 45.73 1.94 67.67 39.94 65.36 39.94"></polygon><polygon  style={{fill:'#2d2d2d'}} points="43.8 39.94 23.06 4 2.31 39.94 0 39.94 23.06 0 46.12 39.94 43.8 39.94"></polygon></svg>
        );
    }
});