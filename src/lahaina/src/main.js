import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/app.c';
import PostTeaserList from './components/post-teaser-list.c';
import Post from './components/post.c';

ReactDom.render((
	<Router history={hashHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={PostTeaserList}/>
			<Route path='/post/:id' component={Post}/>
			<Route path='/category/:category' component={PostTeaserList}/>
		</Route>
	</Router>
), document.getElementById('app'));