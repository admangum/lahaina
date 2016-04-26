var _ = require('lodash'),
	utils;

function getImageAttachment(attachments){
	return _.find(attachments, function(attachment){
		return attachment.mime_type.indexOf('image') === 0;
	});
}

function transformDimensions(options){
	var dimensions = options.dimensions,
		constraints = options.constraints;
	if(dimensions.width <= constraints.width){
		return dimensions;
	}
	return {
		width: constraints.width,
		height: (constraints.width / dimensions.width) * dimensions.height
	};
}

utils = {
	getMediumImage: function(attachments, constraints){
		var attachment = getImageAttachment(attachments),
			dimensions;
		try{
			dimensions = transformDimensions({
				dimensions: attachment.images.medium,
				constraints: constraints
			});
			return (
				<img src={attachment.images.medium.url} width={dimensions.width} height={dimensions.height}/>
			);
		}catch(err){
			return null;
		}
	}
};

module.exports = utils;