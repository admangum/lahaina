import React from 'react';
import Actions from '../actions/actions';
import {Link} from 'react-router';

module.exports = React.createClass({
	onClick(){
		// Actions.postSelected(this.props);
		// window.location.hash = '#post/' + this.props.slug;
	},

	render(){
		var getCategory = (category) => {
			return <Link key={"category-" + category.id} to={"category/" + category.slug}>{category.title}</Link>;
		};
		return (<li onClick={this.onClick}>
					<h2>
						<Link to={"post/" + this.props.data.slug} dangerouslySetInnerHTML={{__html: this.props.data.title}}/>
					</h2>
					<h5 className="post-teaser-categories">{this.props.data.categories.map(getCategory)}</h5>
					<p dangerouslySetInnerHTML={{__html: this.props.data.excerpt}}/>
				</li>);
	}
});