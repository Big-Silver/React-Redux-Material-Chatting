import { Route } from "react-router";
import React from "react";
import App from "./containers/App";
//Redux Smart
import CounterPage from "./containers/CounterPage";
import RedditPage from "./containers/RedditPage";
import TodoPage from "./containers/TodoPage";
import LoginPage from "./containers/LoginPage";
import SignupPage from "./containers/SignupPage";

import Dashboard from './components/personal/Dashboard';
//Redux Dumb
import HomePage from "./components/Home";
import AboutPage from "./components/About";
import error404 from "./components/404";
import cookie from 'react-cookie';

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


export default (
    <Route name="app" path="/" component={App}>
        <Route path="home" component={HomePage} onEnter={requireAuth}/>
        <Route path="reddit" component={RedditPage} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="todo" component={TodoPage} />
        <Route path="counter" component={CounterPage} />
        <Route path="about" component={AboutPage} />
        <Route path="login" component={LoginPage} onEnter={unRequireAuth} />
        <Route path="register" component={SignupPage} />
        <Route path="*" component={error404}/>
    </Route>
);
