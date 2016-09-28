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
        return this.getEmbeddedContentPadding();
	},
    getEmbeddedContentPadding: function(){
        try{
            return this.props.post.custom_fields.embedded_content_padding[0] === '1' ? {'padding-top': '200px'} : null;
        }catch(err){
            return null;
        }
    },
    getEmbeddedContentUrl: function(){
        try{
            return this.props.post.custom_fields.embedded_content_url[0];
        }catch(err){
            return '';
        }
    },
    getEmbeddedContentAspectRatio: function(){
        var ratio;
        try{
            ratio = this.props.post.custom_fields.embedded_content_aspect_ratio[0].split(':');
            ratio = (parseInt(ratio[1], 10) / parseInt(ratio[0], 10)) * 100;
            return isNaN(ratio) ? '' : ratio.toFixed(4);
        }catch(err){
            return '';
        }
    },
    render: function(){
        var url = this.getEmbeddedContentUrl(),
            aspectRatio = this.getEmbeddedContentAspectRatio();
        if(url && aspectRatio){
            return (
                <div className="embedded-content-wrapper" style={{'paddingBottom': aspectRatio + '%'}}>
                    <iframe id="embedded-content" src={url} allowFullScreen="0" frameBorder="0" onLoad={this.onLoad}/>
                </div>
            );
        }else{
            return null;
        }
    }
});