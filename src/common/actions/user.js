import request from 'axios';
import Querystring from 'querystring';
import config from '../../../package.json';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

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
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

export const REQUEST_EMAIL = 'REQUEST_EMAIL';
export const REQUEST_EMAIL_SUCCESS = 'REQUEST_EMAIL_SUCCESS';
export const REQUEST_EMAIL_FAILURE = 'REQUEST_EMAIL_FAILURE';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const CLEAR_COOKIE = 'CLEAR_COOKIE';

export const INIT_MESSAGE = 'INIT_MESSAGE';
export const INIT_MESSAGE_SUCCESS = 'INIT_MESSAGE_SUCCESS';
export const INIT_MESSAGE_FAILURE = 'INIT_MESSAGE_FAILURE';

export const INIT_WORKSPACE = 'INIT_WORKSPACE';
export const INIT_WORKSPACE_SUCCESS = 'INIT_WORKSPACE_SUCCESS';
export const INIT_WORKSPACE_FAILURE = 'INIT_WORKSPACE_FAILURE';

export const CREATE_WORKSPACE = 'CREATE_WORKSPACE';
export const CREATE_WORKSPACE_SUCCESS = 'CREATE_WORKSPACE_SUCCESS';
export const CREATE_WORKSPACE_FAILURE = 'CREATE_WORKSPACE_FAILURE';

var http_config = {
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
	}
};

export function getUserInfo() {
	return {
		type: GET_USER_INFO,
		promise: request.get(`http://${config.apiHost}:${config.apiPort}/users`, http_config)
	};
}

export function createUser(username, email, password, ws_Id) {
	var data = Querystring.stringify({
		"name": username,
		"email": email,
		"password": password,
		"workspace": ws_Id
	});
	return {
		type: REGISTER_USER,
		promise: request.post(`http://${config.apiHost}:${config.apiPort}/register`, data, http_config)
	};
}

export function auth(email, password, wsId) {
	var data = Querystring.stringify({
		"workspaceId": wsId, 
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
	var requestUrl = `http://${config.apiHost}:${config.apiPort}/reset?email=` + encodeURIComponent(email);
	return {
		type: REQUEST_EMAIL,
		promise: request.get(`${requestUrl}`)
	};
}

export function reSetPassword(email, code, password) {
	/* Server sent the code */

	// return {
	// 	type: RESET_PASSWORD,
	// 	promise: request.push(`http://${config.apiHost}/user/reset`, {UserEmail: email, ResetCode: code, Password: password})
	// };

	var data = Querystring.stringify({
		"email": email,
		"password": password
	});
	return {
		type: RESET_PASSWORD,
		promise: request.push(`http://${config.apiHost}:${config.apiPort}/reset`, data, http_config)
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

export function init_message() {
	return {
		type: INIT_MESSAGE,
		promise: request.get(`http://${config.apiHost}:${config.apiPort}/message`, http_config)
	};
}

export function create_workspace(infos) {
	var data = Querystring.stringify({
		"name": infos.displayName,
		"fullName": infos.fullName,
		"admin": infos.email,
		"password" :infos.password
	});
	return {
		type: CREATE_WORKSPACE,
		promise: request.post(`http://${config.apiHost}:${config.apiPort}/create_workspace`, data, http_config)
	}
}

export function init_workspaces() {
	return {
		type: INIT_WORKSPACE,
		promise: request.get(`http://${config.apiHost}:${config.apiPort}/init_workspaces`, http_config)
	}
}