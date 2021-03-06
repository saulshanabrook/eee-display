const React = require('react')
require('es6-promise').polyfill();

// For mounting App component into <section id="app"></section> use:
//
// import App from './app/components/App';
// mount(App, 'app');
//
// else

import App from './app/components/App'
import Posts from './app/components/Posts'
import SignIn from './app/components/SignIn'
import Export from './app/components/Export'

const Router = require('react-router')
const Route = Router.Route
const DefaultRoute = Router.DefaultRoute
const Redirect = Router.Redirect

if (window.hasOwnProperty('posts')) {
    React.render(
      <Posts />,
      document.getElementById('app')
    );
} else {
    const routes = (
        <Route name="app" path="/" handler={App}>
            <Route name="signin" handler={SignIn}/>
            <Route name="posts" handler={Posts}/>
            <Route name="export" handler={Export}/>
            <Redirect from="/" to="signin" />

        </Route>
    )
    Router.run(routes, function (Handler) {
        React.render(<Handler/>, document.getElementById('app'))
    })
}




//or HTML5 pushstate history:
// Router.run(routes, Router.HistoryLocation, function (Handler) {
//    React.render(<Handler/>, document.getElementById('app'));
// });
