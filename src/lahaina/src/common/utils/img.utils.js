var React = require('react'),
	_ = require('lodash'),
	utils;

function getTeaserImageAttachment(post){
	var teaserImageId = post.custom_fields.teaser_image[0];
	return _.find(post.attachments, function(attachment){
		return attachment.id === parseInt(teaserImageId, 10) && attachment.mime_type.indexOf('image') === 0;
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
		height: Math.round((constraints.width / dimensions.width) * dimensions.height)
	};
}

utils = {
	getTeaserImage: function(post, constraints){
		try{
			var attachment = getTeaserImageAttachment(post),
				dimensions;
			if(constraints){
				dimensions = transformDimensions({
					dimensions: attachment.images.full,
					constraints: constraints
				});
				return (
					<img src={attachment.images.full.url} width={dimensions.width} height={dimensions.height}/>
				);
			}
			return (<img src={attachment.images.full.url}/>)
		}catch(err){
			return null;
		}
	},
	getTeaserImageConstraints: function(width, height){
		var constraints = {};
		if(!width && !height){
			return null;
		}
		if(width){
			constraints.width = width;
		}
		if(height){
			constraints.height = height;
		}
		return constraints;
	}
};

module.exports = utils;