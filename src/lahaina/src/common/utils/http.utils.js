var _ = require('lodash');

module.exports = {
	request: {
		all: function(promises){
			var results = Array(promises.length);
			return {
				done: function(cb){
					_.each(promises, function(promise, i){
						promise.end(function(err, res){
							results[i] = {
								status: err ? 'error' : 'fulfilled',
								value: err || res
							};
							if(_.every(results)){
								cb.apply(window, results);
							}
						});
					});
				}
			};
		}
	},
	response: {
		get: function(response, key){
			var result;
			try{
				result = response.value.body || {};
				if(key){
					return result[key] || [];
				}
			}catch(err){
				return [];
			}
		}
	}
};