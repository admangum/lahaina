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
				w: colInfo.colWidth
			};
			cols[cP] += elH;
			cP = (cP === colInfo.colCount - 1) ? 0 : cP + 1;
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
	}
};
module.exports = layoutUtils;