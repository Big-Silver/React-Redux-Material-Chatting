import request from 'axios';
import Querystring from 'querystring';
import config from '../../../package.json';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const GET_USER = 'GET_USER';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGIN_FB = 'LOGIN_FB';
export const LOGIN_FB_SUCCESS = 'LOGIN_FB_SUCCESS';
export const LOGIN_FB_FAILURE = 'LOGIN_FB_FAILURE';

export const LOGIN_GG = 'LOGIN_GG';
export const LOGIN_GGSUCCESS = 'LOGIN_GG_SUCCESS';
export const LOGIN_GG_FAILURE = 'LOGIN_GG_FAILURE';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

export const REQUEST_EMAIL = 'REQUEST_EMAIL';
export const REQUEST_EMAIL_SUCCESS = 'REQUEST_EMAIL_SUCCESS';
export const REQUEST_EMAIL_FAILURE = 'REQUEST_EMAIL_FAILURE';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORDL_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SET_LOGIN = 'SET_LOGIN';
export const SET_SIGN = 'SET_SIGN';

export const CLEAR_COOKIE = 'CLEAR_COOKIE';

var http_config = {
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
	}
};

export function getUser(value) {
  return {
    type: SET_LOGIN,
    payload: value
  };
}

export function onSetSign(value) {
  return {
    type: SET_SIGN,
    payload: value
  };
}

export function onSetLogin(value) {
  return {
    type: SET_LOGIN,
    payload: value
  };
}

export function getUserInfo(user) {
	return {
		type: GET_USER_INFO,
		promise: request.get(`http://${config.apiHost}:${config.apiPort}/api/users/${user.userId}?access_token=${user.token}`)
	};
}

export function createUser(email, password) {
	var data = Querystring.stringify({
		"email": email,
		"password": password
	});
	return {
		type: REGISTER_USER,
		promise: request.post(`http://${config.apiHost}:${config.apiPort}/register`, data, http_config)
	};
}

export function auth(email, password) {
	var data = Querystring.stringify({ 
		"email": email,
		"password": password
	});
	return {
		type: LOGIN,
		promise: request.post(`http://${config.apiHost}:${config.apiPort}/login`, data, http_config)
	};
}

export function authFB() {
	return {
		type: LOGIN_FB,
		promise: request.post(`http://${config.apiHost}/auth/facebook`)
	};
}

export function authGG() {
	return {
		type: LOGIN_GG,
		promise: request.post(`http://${config.apiHost}/auth/google`)
	};
}

export function requestEmail(email) {
	var requestUrl = `http://${config.apiHost}/user/reset?UserEmail=` + encodeURIComponent(email);
	return {
		type: REQUEST_EMAIL,
		promise: request.get(`${requestUrl}`, {UserEmail: email})
	};
}

export function reSetPassword(email, code, password) {
	return {
		type: RESET_PASSWORD,
		promise: request.push(`http://${config.apiHost}/user/reset`, {UserEmail: email, ResetCode: code, Password: password})
	};
}

export function logout(user) {
	return {
		type: LOGOUT,
		payload: user
	}
}

export function toogleClearCookie() {
	return {
		type: CLEAR_COOKIE
	};
}