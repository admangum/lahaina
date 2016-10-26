var React = require('react');
module.exports = React.createClass({
    getClassName: function(){
        return this.props.location.pathname.match(/^\/post\//) ? 'back' : '';
    },
    onLoad: function(){
        var a;
    },
    render: function(){
        return (
            <svg className={this.getClassName()} onLoad={this.onLoad} viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="30" style={{fill:'#232323'}}/>
                <line className="a1" x1="23.3" y1="17.44" x2="36" y2="39.43" style={{fill:'none',stroke:'#fff','stroke-linecap':'round','stroke-linejoin':'round','stroke-width':'2px'}}/>
                <line className="a2" x1="10.6" y1="39.43" x2="23.3" y2="17.44" style={{fill:'none',stroke:'#fff','stroke-linecap':'round','stroke-linejoin':'round','stroke-width':'2px'}}/>
                <line className="m" x1="35.9" y1="17.44" x2="48.6" y2="39.43" style={{fill:'none',stroke:'#fff','stroke-linecap':'round','stroke-miterlimit':10,'stroke-width':'2px'}}/>
            </svg>
        );
    }
});