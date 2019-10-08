import { SET_REGISTER_ERROR, SET_REGISTER_PENDING, SET_REGISTER_SUCCESS } from "../actions/register";

import initialState from '../store/initialState';

export const reducer = (
  state = initialState.register,
  action
) => {
  switch (action.type) {
    case SET_REGISTER_ERROR:
      return Object.assign({}, state, {
        isError: action.payload
      });
    case SET_REGISTER_PENDING:
    return Object.assign({}, state, {
        isPending: action.payload
    });
    case SET_REGISTER_SUCCESS:
        return Object.assign({}, state, {
          isSuccess: action.payload
        });
  
    default:
      return state;
  }
}