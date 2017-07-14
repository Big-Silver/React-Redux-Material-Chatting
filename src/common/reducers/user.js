import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as UserActions from '../actions/user';
import { auth } from '../actions/user';
import {GET_USER, 
        LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
        LOGIN_FB_SUCCESS, LOGIN_FB_FAILURE,
        LOGIN_GG_SUCCESS, LOGIN_GG_FAILURE, 
        GET_USER_INFO_FAILURE, GET_USER_INFO_SUCCESS, 
        REQUEST_EMAIL_SUCCESS, REQUEST_EMAIL_FAILURE,
        LOGOUT, LOGOUT_SUCCESS, 
        CLEAR_COOKIE, 
        REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
        SET_LOGIN, SET_SIGN,
        } from '../actions/user';

const initialState = { signed: false, logged: false, login: false, sign: false };

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return state;
            break;
        case LOGIN_REQUEST:
            console.log("LOGIN_REQUEST");
            return true;
            break;
        case LOGIN_SUCCESS:
            // return Object.assign({}, state, {
            //     error: null,
            //     userId: action.req.data.UserId,
            //     sessionId: action.req.data.SessionId,
            //     userName: action.req.data.UserName,
            //     displayName: action.req.data.DisplayName,
            //     responseStatus: action.req.data.ResponseStatus,
						// 		logged: true,
            //     updateCookie: true
            // });
            return {
                logged: true
            }
            break;
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                error: action.error.data.ResponseStatus.Message
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
            return {
                logged: true,
                signed: true
            }		
            break;
        case REGISTER_USER_FAILURE:
            return Object.assign({}, state, {
                error: action.error.data.ResponseStatus.Message
            });
            break;
        case REQUEST_EMAIL_SUCCESS:
            return Object.assign({}, state, {
                requestEmail: true
            });
            break;
        case REQUEST_EMAIL_FAILURE:
            console.log("REQUEST_EMAIL_FAILURE");
            return Object.assign({}, state, {
                error: action.error.data.ResponseStatus.Message
            });
            break;
        case GET_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                info: action.req.data
            });
            break;
        // case LOGOUT_SUCCESS:            
        //     return Object.assign({}, state, {
        //        info: null,
        //        token: null,
        //        userId: null,
        //        clearCookie: true
        //     });
        //     break;
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
        case LOGOUT:            
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
