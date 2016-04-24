import React from 'react';
import Actions from '../actions/actions';
import {Link} from 'react-router';
import PostCategories from './common/post-categories.c';
import _ from 'lodash';
import imgUtils from '../utils/img.utils';

module.exports = React.createClass({
	onClick(){
		// Actions.postSelected(this.props);
		// window.location.hash = '#post/' + slug;
	},

	render(){
		var TEASER_WIDTH = 200,
			data = this.props.data;

		function getImgDimen(attachment){
			try{

				return imgUtils.transformDimensions({
					dimensions: attachment.images.medium,
					constraints: {
						width: TEASER_WIDTH
					}
				});
			}catch(err){
				return null;
			}
		}

		function getImg(){
			var attachment = _.find(data.attachments, function(attachment){
					return attachment.mime_type.indexOf('image') === 0;
				});
			var dimensions = getImgDimen(attachment);


			return dimensions && (<img src={attachment.images.medium.url} width={dimensions.width} height={dimensions.height}/>);
		}


		return (<li className="post-teaser" onClick={this.onClick}>
					{getImg()}
					<h2 className="post-title">
						<Link to={"post/" + data.slug} dangerouslySetInnerHTML={{__html: data.title}}/>
					</h2>
					<PostCategories data={data.categories}/>
					<p dangerouslySetInnerHTML={{__html: data.excerpt}}/>
				</li>);
	}
});