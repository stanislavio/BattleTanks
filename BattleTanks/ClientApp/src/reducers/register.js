import { SET_REGISTER_ERROR, SET_REGISTER_PENDING, SET_REGISTER_SUCCESS, RESET_REGISTER } from "../actions/register";

import initialState from '../store/initialState';

export const reducer = (
  state = initialState.register,
  action
) => {
  switch (action.type) {
    case SET_REGISTER_ERROR:
      return Object.assign({}, state, {
        isError: action.payload,
        isPending: false,
        isSuccess: false
      });
    case SET_REGISTER_PENDING:
    return Object.assign({}, state, {
        isPending: action.payload,
        isSuccess: false,
        isError: null
    });
    case SET_REGISTER_SUCCESS:
        return Object.assign({}, state, {
          isSuccess: action.payload,
          isPending: false,
          isError: null
        });
    case RESET_REGISTER:
      return initialState.register
  
    default:
      return state;
  }
}