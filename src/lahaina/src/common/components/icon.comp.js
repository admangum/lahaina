var React = require('react');

// class Icon extends React.Component {
// 	render(){
// 		var glyph = this.props.glyph;
// 		return (
// 			<svg className="icon" dangerouslySetInnerHTML={{__html: '<use xlink:href="'+glyph+'"></use>'}} />
// 		);
// 	}
// }

module.exports = ({glyph}) => (
		<svg className="icon" dangerouslySetInnerHTML={{__html: '<use xlink:href="'+glyph+'"></use>'}} />
	);