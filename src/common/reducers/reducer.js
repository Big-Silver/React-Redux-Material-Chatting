import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import userReducer from './user'
import counterReducer from './counter'
import indexReducer from './index'
import layoutReducer from './layout'
import redditReducer from './reddit'
import versionReducer from './version'


const reducer = combineReducers({
    form: formReducer,
    routing: routerReducer,
    user: userReducer,
    counter: counterReducer,
    index: indexReducer,
    layout: layoutReducer,
    reddit: redditReducer,
    version: versionReducer
});

export default reducer;