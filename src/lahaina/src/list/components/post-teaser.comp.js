var React = require('react');
var Actions = require('../../core/actions/core.actions');
var Link = require('react-router').Link;
var PostCategories = require('../../common/components/post-categories.comp');
var Actions = require('../../core/actions/core.actions');
var _ = require('lodash');
var imgUtils = require('../../common/utils/img.utils');
var config = require('../../common/config/config');

module.exports = React.createClass({
	onClick: function(){
		var post = this.props.data;
		this.refs[post.id].classList.add('selected');
		Actions.postSelected(post);
		// location.hash = '/post/' + this.props.data.slug;
		//
	},
	getRef: function(){
		return this.refs[this.props.data.id];
	},
	render: function(){
		var data = this.props.data,
			layout = this.props.layout,
			cols = this.props.cols,
			className = 'post-teaser',
			style = {
				width: cols.colWidth + 'px'
			};

			if(layout){
				style.transform = 'translate(' + layout.x + 'px,' + layout.y + 'px)';
			};

		return (<li ref={data.id} className={className} style={style} onClick={this.onClick}>
					{imgUtils.getMediumImage(data.attachments, {width: config.layout.minColWidth})}
					<h2 className="post-title">
						<span dangerouslySetInnerHTML={{__html: data.title}}></span>
					</h2>
					<PostCategories data={data.categories}/>
					<p dangerouslySetInnerHTML={{__html: data.excerpt}}/>
				</li>);
	}
});