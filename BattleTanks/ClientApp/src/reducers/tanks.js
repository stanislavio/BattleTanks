import { ADD_TANK, SET_TANK_SUCCESS, SET_TANK_PENDING, SET_TANK_ERROR, GET_TANKS } from '../actions/tanks';
import initialState from '../store/initialState';

export const reducer = (
  state = initialState.tanks,
  action
) => {
  switch (action.type) {

    case SET_TANK_PENDING:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: null,
        isPending: true,
      });

    case SET_TANK_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: true,
        isError: null,
        isPending: false,
      });

    case SET_TANK_ERROR:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: true,
        isPending: false,
      });

    case GET_TANKS:
      return Object.assign({}, state, {
        data: action.payload
      });

    case ADD_TANK:      
      return state;
    
    default:
      return state;
  }
}