var _ = require('lodash');
var http = require('superagent');
var Reflux = require('reflux');
var Actions = require('./footer.actions');

module.exports = Reflux.createStore({
	listenables: [Actions],
	onRouteChanged: function(routeParams, post){
		console.log(routeParams + '/' + post);
	}

});