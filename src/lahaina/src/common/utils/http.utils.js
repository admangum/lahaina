var _ = require('lodash');

module.exports = {
	request: {
		all: function(promises){
			var results = Array(promises.length);
			return {
				done: function(cb){
					function checkDone(){
						if(_.every(results)){
							cb.apply(window, results);
						}
					}
					_.each(promises, function(promise, i){
						if(_.isFunction(promise.end)){
							promise.end(function(err, res){
								results[i] = {
									status: err ? 'error' : 'fulfilled',
									value: err || res
								};
								checkDone();
							});
						}else{
							results[i] = {
								status: 'fulfilled',
								value: promise
							};
							checkDone();
						}
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