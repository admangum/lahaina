import React from 'react';
import Actions from '../actions/actions';
import {Link} from 'react-router';
import PostCategories from './common/post-categories.c';

module.exports = React.createClass({
	onClick(){
		// Actions.postSelected(this.props);
		// window.location.hash = '#post/' + this.props.slug;
	},

	render(){
		// var getCategory = (category) => {
		// 	return <li key={"category-" + category.id}><WrappedLink to={'category/' + category.slug} className="post-category" content={category.title} /></li>;
		// };
		return (<li className="post-teaser" onClick={this.onClick}>
					<h2 className="post-title">
						<Link to={"post/" + this.props.data.slug} dangerouslySetInnerHTML={{__html: this.props.data.title}}/>
					</h2>
					<PostCategories data={this.props.data.categories}/>
					<p dangerouslySetInnerHTML={{__html: this.props.data.excerpt}}/>
				</li>);
	}
});