import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as UserActions from '../actions/user';
import { auth } from '../actions/user';
import {
        LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
        LOGIN_FB_SUCCESS, LOGIN_FB_FAILURE,
        LOGIN_GG_SUCCESS, LOGIN_GG_FAILURE, 
        GET_USER_INFO_FAILURE, GET_USER_INFO_SUCCESS, 
        REQUEST_EMAIL_SUCCESS, REQUEST_EMAIL_FAILURE,
        RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
        LOGOUT, LOGOUT_SUCCESS, 
        CLEAR_COOKIE, 
        REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
        SET_LOGIN, SET_SIGN,
        INIT_MESSAGE, INIT_MESSAGE_SUCCESS, INIT_MESSAGE_FAILURE,
        CREATE_WORKSPACE, CREATE_WORKSPACE_SUCCESS, CREATE_WORKSPACE_FAILURE,
        INIT_WORKSPACE, INIT_WORKSPACE_SUCCESS, INIT_WORKSPACE_FAILURE
        } from '../actions/user';

const initialState = { signed: false, logged: false, login: false, sign: false };

export default function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return true;
            break;
        case LOGIN_SUCCESS:
            var user_session = sessionStorage.getItem('rChat_user');
            if (!user_session) {
                sessionStorage.setItem('rChat_user', action.req.data[0]._id);
                sessionStorage.setItem('rUser_name', action.req.data[0].name);
            }
            return {
                logged: true
            }
            break;
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                error: 'Login is Failed.'
            });
            break;
        case LOGIN_FB_SUCCESS:						
            console.log("facebook login")		
            break;
        case LOGIN_FB_FAILURE:						
            return Object.assign({}, state, {
                error: "You are not logged in. Please log in and try again."
            });		
            break;
        case LOGIN_GG_SUCCESS:						
            console.log("google login")		
            break;
        case LOGIN_GG_FAILURE:						
            console.log("google fail")		
            break;
        case REGISTER_USER_SUCCESS:
            var user_session = sessionStorage.getItem('rChat_user');
            if (!user_session) {
                sessionStorage.setItem('rChat_user', action.req.data._id);
                sessionStorage.setItem('rUser_name', action.req.data.name);
            }			
            return {
                logged: true,
                signed: true
            }
            break;
        case REGISTER_USER_FAILURE:
            return Object.assign({}, state, {
                error: 'Register is Failed.'
            });
            break;
        case REQUEST_EMAIL_SUCCESS:
            return Object.assign({}, state, {
                requestEmail: true
            });
            break;
        case REQUEST_EMAIL_FAILURE:
            return Object.assign({}, state, {
                error: action.error.data.ResponseStatus.Message
            });
            break;
        case RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                reSetPassowrd: true
            });
            break;
        case RESET_PASSWORD_FAILURE:
            // return Object.assign({}, state, {
            //     error: action.error.data.ResponseStatus.Message
            // });
            break;
        case GET_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                users: action.req.data[0]
            });
            break;
        case GET_USER_INFO_FAILURE:
            return Object.assign({}, state, {
                error: 'Getting user_info is Failed.'
            });
            break;
        case CLEAR_COOKIE:
            return Object.assign({}, state, {
                clearCookie: false
            });
            break;
        case SET_LOGIN:
            return Object.assign({}, state, {
                sign: false
            });
            break;
        case SET_SIGN:
            return Object.assign({}, state, {
                sign: true
            });
            break;
        case INIT_MESSAGE:
            console.log("INIT_MESSAGE");
            return true;
            break;
        case INIT_MESSAGE_SUCCESS:
            return {
                logged: true,
                messages: action.req.data
            }
            break;
        case INIT_MESSAGE_FAILURE:
            return Object.assign({}, state, {
                error: 'Message is Failed.'
            });
            break;
        case CREATE_WORKSPACE_SUCCESS:
            return {
                created_ws: action.req.data
            }
            break;
        case CREATE_WORKSPACE_FAILURE:
            return Object.assign({}, state, {
                error: 'Creating the workspace is Failed.'
            });
            break;
        case INIT_WORKSPACE_SUCCESS:
            return {
                workspaces: action.req.data
            }
            break;
        case INIT_WORKSPACE_FAILURE:
            return Object.assign({}, state, {
                error: 'Getting Workspace is Failed.'
            })
            break;
        case LOGOUT:
            sessionStorage.clear();
            return Object.assign({}, state, {
                info: null,
                token: null,
                userId: null,
                clearCookie: true,       
                sign: false, 
                logged: false
            });
            break;
        default:
            return state;
    }
}
