import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import userReducer from './user'
import indexReducer from './index'
import layoutReducer from './layout'
import versionReducer from './version'


const reducer = combineReducers({
    form: formReducer,
    routing: routerReducer,
    user: userReducer,
    index: indexReducer,
    layout: layoutReducer,
    version: versionReducer
});

export default reducer;