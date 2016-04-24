var React = require('react');
var ReactDom = require('react-dom');
// var { Router, Route, IndexRoute, hashHistory } = require('react-router');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var App = require('./components/app.c');
var PostTeaserList = require('./components/post-teaser-list.c');
var Post = require('./components/post.c');

ReactDom.render((
	<Router history={require('react-router').hashHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={PostTeaserList}/>
			<Route path='/post/:id' component={Post}/>
			<Route path='/category/:category' component={PostTeaserList}/>
		</Route>
	</Router>
), document.getElementById('app'));