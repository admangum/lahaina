var React = require('react');

module.exports = function(options) {
	return (
		<svg className="icon" dangerouslySetInnerHTML={{__html: '<use xlink:href="'+options.glyph+'"></use>'}} />
	); 
};