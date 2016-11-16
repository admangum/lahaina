var React = require('react');
var HashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

module.exports = React.createClass({
    getClassName: function(){
        return this.props.location.pathname.match(/^\/post\//) ? ' back' : '';
    },
    onClick: function(e){
        if(this.getClassName().match(/back/)){
            // go back
            HashHistory.goBack();
        }else{
            // go home
            document.location = '';
        }
    },
    render: function(){
        return (
            <button className="mark-btn" onClick={this.onClick}>
                <svg className={'mark-svg' + this.getClassName()} onLoad={this.onLoad} viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="30" style={{fill:'#232323'}}/>
                    <g className="mark">
                        <line className="a1" x1="23.3" y1="17.44" x2="36" y2="39.43" style={{fill:'none',stroke:'#fff','strokeLinecap':'round','strokeLinejoin':'round','strokeWidth':'2px'}}/>
                        <line className="a2" x1="10.6" y1="39.43" x2="23.3" y2="17.44" style={{fill:'none',stroke:'#fff','strokeLinecap':'round','strokeLinejoin':'round','strokeWidth':'2px'}}/>
                        <line className="m" x1="35.9" y1="17.44" x2="48.6" y2="39.43" style={{fill:'none',stroke:'#fff','strokeLinecap':'round','strokeMiterlimit':10,'strokeWidth':'2px'}}/>
                    </g>
                </svg>
            </button>
        );
    }
});