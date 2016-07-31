var _ = require('lodash');

module.exports = {
	all: function(){
		var promises = arguments,
			results = Array(promises.length);
		return {
			done: function(cb){
				_.each(promises, function(promise, i){
					promise.end(function(err, res){
						results[i] = {
							status: err ? 'error' : 'fulfilled',
							value: err || res
						};
						if(_.every(results)){
							cb(results);
						}
					});
				});
			}
		};
	}
};