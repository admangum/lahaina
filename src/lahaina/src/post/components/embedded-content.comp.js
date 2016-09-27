var React = require('react');

module.exports = React.createClass({
    onLoad: function(){
        this.updateEmbeddedContentBodyStyles();
    },
    updateEmbeddedContentBodyStyles: function(){
        var embeddedContentBody = this.getEmbeddedContentBody(),
            embeddedContentBodyStyles = this.getEmbeddedContentBodyStyles();
        if(embeddedContentBody && embeddedContentBodyStyles){
            _.each(embeddedContentBodyStyles, function(val, key){
                embeddedContentBody.style[key] = val;
            });
        }
	},
	getEmbeddedContentBody: function(){
		var embeddedContent = document.getElementById('embedded-content'),
			embeddedDocument = embeddedContent && (embeddedContent.contentDocument || embeddedContent.contentWindow.document);
		return embeddedDocument && embeddedDocument.getElementsByTagName('body')[0];
	},
	getEmbeddedContentBodyStyles: function(){
		var post = this.props.post,
            styleDef = post.custom_fields.embedded_content_body_styles;
			styleArr = styleDef && styleDef[0] && styleDef[0].split(';');
		return _.reduce(styleArr, function(memo, style){
			style = (style.replace(/\s/g, '') || '').split(':');
			if(style.length === 2){
				// style[0] == style name, style[1] == style value
				memo[style[0]] = style[1];
			}
			return memo;
		}, {});
	},
    render: function(){
        return (
            <div className="embedded-content-wrapper">
                <iframe id="embedded-content" src="/projects/test" allowFullScreen="0" frameBorder="0" onLoad={this.onLoad}/>
            </div>
        );
    }
});