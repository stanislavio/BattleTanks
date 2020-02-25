import { 
        SET_TANK_GAME, 
        SET_MAP_GAME, 
      SET_GAME_SUCCESS, 
    SET_GAME_ERROR,
    SET_GAME_PENDING, 
     SET_CANVAS_GAME, RESET_GAME } from "../actions/game";
// import { SET_LOGOUT } from '../actions/logout';
import initialState from '../store/initialState';

export const reducer = (
  state = initialState.game,
  action
) => {
  switch (action.type) {
    
    case SET_TANK_GAME: 
    return Object.assign({}, state, {
      player: action.payload
    });

    case SET_MAP_GAME: 
    return Object.assign({}, state, {
      map: action.payload
    });

    case SET_CANVAS_GAME: 
    return Object.assign({}, state, {
      ctx: action.payload
    });
    
    case RESET_GAME: 
    return Object.assign({}, state, initialState.game);


    case SET_GAME_PENDING: 
        return Object.assign({}, state, {
          isSuccess: false,
          isError: null,
          isPending: true,
        });
    case SET_GAME_SUCCESS: 
    return Object.assign({}, state, {
      isSuccess: true,
      isError: null,
      isPending: false,
    });
    case SET_GAME_ERROR: 
    return Object.assign({}, state, {
      isSuccess: false,
      isError: action.payload,
      isPending: false,
    });
    
    default:
      return state;
  }
}