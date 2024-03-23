import { createReducer, on } from '@ngrx/store';
import {  getUsername } from './user.actions';

export type userType = {
  username: string;
};
const initialState: userType = {
  username: '',
};
export const userReducer = createReducer(
  initialState,
  on(getUsername, (state, action) => {
    return { ...state, username: action.value };
  }),

);
