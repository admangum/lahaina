var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var IndexRedirect = require('react-router').IndexRedirect;
var App = require('./app.comp');
var PostTeaserList = require('./list/components/post-teaser-list.comp');
var Post = require('./post/components/post.comp');

require('es6-promise').polyfill();

ReactDom.render((
	<Router history={require('react-router').hashHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={PostTeaserList}/>
			<Route path='/post/:id' component={Post}/>
			<Route path='/:page' component={PostTeaserList}/>
			<Route path='/category/:category(/:page)' component={PostTeaserList}/>
			<Route path='/tag/:tag(/:page)' component={PostTeaserList}/>
			<IndexRedirect from="/" to="1"/>
		</Route>
	</Router>
), document.getElementById('app'));