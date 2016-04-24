module.exports = {
	transformDimensions(options){
		dimensions = options.dimensions;
		constraints = options.constraints;
		if(dimensions.width <= constraints.width){
			return dimensions;
		}
		return {
			width: constraints.width,
			height: (constraints.width / dimensions.width) * dimensions.height
		};
	}
};