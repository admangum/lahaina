var React = require('react');
var Link = require('react-router').Link;
var PostTags = require('../../common/components/post-tags.comp');
var _ = require('lodash');
var imgUtils = require('../../common/utils/img.utils');
var config = require('../../common/config/config');

module.exports = React.createClass({
	onClick: function(e){
		var post = this.props.data,
			parentCallback = this.props.onClick;
		
		this.refs[post.id].classList.add('selected');
		
		if(parentCallback){
			parentCallback(post);
		}
	},
	getRef: function(){
		return this.refs[this.props.data.id];
	},
	getStyle: function(cols){
		var width = cols ? (cols.colWidth) : null;
		return width ? { width: width } : null;
	},
	render: function(){
		var data = this.props.data,
			layout = this.props.layout,
			cols = this.props.cols,
			style = this.getStyle(cols),
			width = style ? style.width : null;

			if(layout){
				style.transform = 'translate(' + layout.x + 'px,' + layout.y + 'px)';
			};

		function getExcerpt(){
			if(data.custom_fields.summary && data.custom_fields.summary.length){
				return data.custom_fields.summary[0];
			}
		}

		return (<li ref={data.id} className={'post-teaser'} style={style} onClick={this.onClick}>
					{imgUtils.getTeaserImage(data, imgUtils.getTeaserImageConstraints(width))}
					<PostTags data={data.categories} type="category" />
					<h2 className="post-title" style={{width: width}}>
						<span dangerouslySetInnerHTML={{__html: data.title}}></span>
					</h2>
					<PostTags data={data.tags} type="tag" />
					<p dangerouslySetInnerHTML={{__html: getExcerpt()}}/>
				</li>);
	}
});