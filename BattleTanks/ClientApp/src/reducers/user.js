import initialState from "../store/initialState";
import { SET_USER, SET_LOGOUT } from "../actions/login";
import { FOLLOW_USER } from "../actions/profile";
// import {SET_LOGOUT} from '../actions/logout';

// import { authenticate } from '../actions/authentication';

export const reducer = (state = initialState.user, action) => {
  //state = state || initialState.user;
  switch (action.type) {
    case SET_USER:
      return action.payload;

    // case authenticate.SET_AUTHENTICATE:
    //     localStorage.setItem("token", action.payload.token);
    //     return action.payload;

    case SET_LOGOUT:
      return initialState.user;

    case FOLLOW_USER:
      return Object.assign({}, state, {
        friends: action.payload,
      });

    default:
      return state;
  }
};
