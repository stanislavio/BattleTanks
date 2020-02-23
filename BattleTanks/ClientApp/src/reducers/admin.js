import { ADD_MAP, SET_ADMIN_SUCCESS, SET_ADMIN_PENDING, SET_ADMIN_ERROR, SET_MAPS } from '../actions/admin';
import initialState from '../store/initialState';

export const reducer = (
  state = initialState.admin,
  action
) => {
  switch (action.type) {

    case SET_ADMIN_PENDING:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: null,
        isPending: true,
      });

    case SET_ADMIN_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: true,
        isError: null,
        isPending: false,
      });

    case SET_ADMIN_ERROR:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: true,
        isPending: false,
      });

    case SET_MAPS:
      return Object.assign({}, state, {
        maps: action.payload
      });

    case ADD_MAP:      
      return state;
    
    default:
      return state;
  }
}