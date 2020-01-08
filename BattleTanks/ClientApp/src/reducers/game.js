import { SET_DEFAULT_GAME } from "../actions/game";
// import { SET_LOGOUT } from '../actions/logout';
import initialState from '../store/initialState';

export const reducer = (
  state = initialState.game,
  action
) => {
  switch (action.type) {
    
    case SET_DEFAULT_GAME: 
        return Object.assign({}, state, action.payload);
    
    default:
      return state;
  }
}