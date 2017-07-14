import 'babel-core/register';
import ReactDOM from 'react-dom';
import React from 'react';
import { ReduxRouter, Router, IndexRoute, Route, RouterContext, browserHistory } from 'react-router';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import cookie from 'react-cookie';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

import App from "../common/containers/App";
import ExternalLayout from "../common/containers/ExternalLayout"
import InternalLayout from "../common/containers/InternalLayout"

import LoginPage from "../common/containers/LoginPage";
import SignupPage from "../common/containers/SignupPage";
import ForgetPage from "../common/containers/ForgetPage";
import ResetPage from "../common/containers/ResetPage";
import HomePage from "../common/components/Home";

import promiseMiddleware from '../common/api/promiseMiddleware';

import reducer from '../common/reducers/reducer';

import "../../styles/index.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
// const history = createBrowserHistory();
const initialState = window.__INITIAL_STATE__;
// const store = configureStore(initialState);
const rootElement = document.getElementById('root');
const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(browserHistory);
const store = createStore(reducer, {}, compose(applyMiddleware(
    promiseMiddleware,
	routeMiddleware,
	loggerMiddleware,
	thunkMiddleware
), window.devToolsExtension ? window.devToolsExtension() : f => f));

const history = syncHistoryWithStore(browserHistory, store);

function requireAuth() {
    // if(cookie.load('token')){
    //     return true;
    // }else{
    //     window.location = '/login'
    // }
}

function unRequireAuth() {
    // if(!cookie.load('token')){
    //     return true;
    // }else{
    //     window.location = '/home'
    // }
}

ReactDOM.render(
    <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={ExternalLayout}>
                    <IndexRoute component={LoginPage} onEnter={unRequireAuth}/>
                    <Route path="/register" component={SignupPage} />
                    <Route path="/forget_password" component={ForgetPage} />
                    <Route path="/reset_password" component={ResetPage} />
                </Route>
                <Route path="/home" component={InternalLayout}>
                    <IndexRoute component={HomePage} onEnter={requireAuth}/>
                </Route>
                {/*<Route name="app" path="/" component={App}>
                    <Route path="home" component={HomePage} onEnter={requireAuth}/>
                    <Route path="login" component={LoginPage} onEnter={unRequireAuth} />
                    <Route path="register" component={SignupPage} />
                </Route>*/}
            </Router>
    </Provider>,
    document.getElementById('root')
);
// if (process.env.NODE_ENV !== 'production') {
//     var devtools = require('../server/devtools');
//     devtools.default(store);
// }