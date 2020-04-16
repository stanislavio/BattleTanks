import {
  SET_USER_ERROR,
  SET_USER_SUCCESS,
  SET_USER_PENDING,
} from "../actions/profile";
import initialState from "../store/initialState";

export const reducer = (state = initialState.profile, action) => {
  switch (action.type) {
    case SET_USER_PENDING:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: null,
        isPending: true,
      });

    case SET_USER_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: true,
        isError: null,
        isPending: false,
        data: action.payload,
      });

    case SET_USER_ERROR:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: true,
        isPending: false,
        data: action.payload,
      });
    default:
      return state;
  }
};
