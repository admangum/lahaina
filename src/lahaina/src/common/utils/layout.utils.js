var config = require('../config/config').layout;
var _ = require('lodash');
var layoutUtils = {
	getLayoutInfo: function(refs){
		var colInfo = layoutUtils.getColumnInfo(),
			cols = _.fill(Array(colInfo.colCount), 0),
			cP = 0; // pointer
		return _.reduce(refs, function(memo, ref, key){
			var el = ref.getRef(),
				elH = el.clientHeight;
			memo[key] = {
				x: cP * (colInfo.colWidth + config.gutterWidth),
				y: cols[cP],
				w: colInfo.colWidth,
				h: elH
			};
			cols[cP] += elH;

			// Find shortest column
			cP = _.reduce(cols, function(memo, v, k){
					memo = (_.isUndefined(memo.v) || memo.v > v) ? {v: v, k: k} : memo;
					return memo;
				}, {}).k;

			return memo;
		}, {});
	},
	getColumnInfo: function(){
		var appW = document.getElementById('page').clientWidth,
			colCount = Math.floor(Math.max((appW + config.gutterWidth) / (config.minColWidth + config.gutterWidth), 1)),
			gutCount = colCount - 1,
			colWidth = Math.round((appW - (gutCount * config.gutterWidth)) / colCount);
		return {
			colCount: colCount,
			colWidth: colWidth
		};
	},
	getLayoutHeight: function(layoutInfo){
		return _.reduce(layoutInfo, function(memo, post){
			return _.max([memo, post.y + post.h]);
		}, 0);
	},
	getPageInfo: function(){
		return {
			w: document.getElementById('page').clientWidth
		};
	}
};
module.exports = layoutUtils;