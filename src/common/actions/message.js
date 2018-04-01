import request from 'axios';
import Querystring from 'querystring';
import config from '../../../package.json';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

let nextMessageId = 0;
const nextUserId = 0;

export const addMessage = (message, author) => ({
    type: ADD_MESSAGE,
    id: nextMessageId++,
    message,
    author
})
  
export const messageReceived = (message, author) => ({
    type: MESSAGE_RECEIVED,
    id: nextMessageId++,
    message,
    author
})
