import { combineReducers } from 'redux';
import posts from './posts';
import uploads from './uploads';

export const reducers = combineReducers({ posts, uploads});