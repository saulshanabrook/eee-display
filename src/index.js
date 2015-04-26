const React = require('react')
require('es6-promise').polyfill();
import {mount} from './app/lib/tools'

// For mounting App component into <section id="app"></section> use:
//
// import App from './app/components/App';
// mount(App, 'app');
//
// else

import App from './app/components/App'
import Home from './app/components/Home'
import SignIn from './app/components/SignIn'

const Router = require('react-router')
const Route = Router.Route
const DefaultRoute = Router.DefaultRoute

const routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="home" handler={Home}/>
        <Route name="signin" handler={SignIn}/>
        <DefaultRoute handler={SignIn}/>
    </Route>
)

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'))
})

// or HTML5 pushstate history:
//Router.run(routes, Router.HistoryLocation, function (Handler) {
//    React.render(<Handler/>, document.getElementById('app'));
//});
