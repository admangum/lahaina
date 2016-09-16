var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (
            <div className="embedded-content">
                <iframe src="http://www.nytimes.com" allowfullscreen="0" frameborder="0" />
            </div>
        );
    }
});