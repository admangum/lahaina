var React = require('react');

module.exports = ({glyph}) => (
		<svg className="icon" dangerouslySetInnerHTML={{__html: '<use xlink:href="'+glyph+'"></use>'}} />
	);