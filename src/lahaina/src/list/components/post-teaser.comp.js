var React = require('react');
var Actions = require('../../core/actions/core.actions');
var Link = require('react-router').Link;
var PostTags = require('../../common/components/post-tags.comp');
var Actions = require('../../core/actions/core.actions');
var _ = require('lodash');
var imgUtils = require('../../common/utils/img.utils');
var config = require('../../common/config/config');

module.exports = React.createClass({
	onClick: function(){
		var post = this.props.data;
		this.refs[post.id].classList.add('selected');
		Actions.postSelected(post);
	},
	getRef: function(){
		return this.refs[this.props.data.id];
	},
	render: function(){
		var data = this.props.data,
			layout = this.props.layout,
			cols = this.props.cols,
			className = 'post-teaser',
			width = cols.colWidth + 'px',
			style = {
				width: width
			};

			if(layout){
				style.transform = 'translate(' + layout.x + 'px,' + layout.y + 'px)';
			};

		return (<li ref={data.id} className={className} style={style} onClick={this.onClick}>
					{imgUtils.getTeaserImage(data, {width: config.layout.minColWidth})}
					<PostTags data={data.categories} type="category" />
					<h2 className="post-title" style={{width:width}}>
						<span dangerouslySetInnerHTML={{__html: data.title}}></span>
					</h2>
					<PostTags data={data.tags} type="tag" />
					<div dangerouslySetInnerHTML={{__html: data.excerpt}}/>
				</li>);
	}
});