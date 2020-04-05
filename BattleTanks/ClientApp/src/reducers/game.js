import { 
  SET_MAP_ERROR,
  SET_MAP_PENDING,
  SET_MAP_SUCCESS,
  SET_PLAYERS_ERROR,
  SET_PLAYERS_PENDING,
  SET_PLAYERS_SUCCESS,
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
    
    case SET_MAP_PENDING: 
    return Object.assign({}, state, {
      map: {
        isPending: true,
        isSuccess: false,
        isError: false,
        data: null
      }
    });
    
    case SET_MAP_ERROR: 
    return Object.assign({}, state, {
      map: {
        isPending: false,
        isSuccess: false,
        isError: true,
        data: null
      }
    });


    case SET_MAP_SUCCESS: 
    return Object.assign({}, state, {
      map: {
        isPending: false,
        isSuccess: true,
        isError: false,
        data: action.payload
      }
    });

    case SET_PLAYERS_PENDING: 
    return Object.assign({}, state, {
      players: {
        isPending: true,
        isSuccess: false,
        isError: false,
        data: null
      }
    });

    case SET_PLAYERS_ERROR: 
    return Object.assign({}, state, {
      players: {
        isPending: false,
        isSuccess: false,
        isError: true,
        data: null
      }
    });

    case SET_PLAYERS_SUCCESS: 
    return Object.assign({}, state, {
      players: {
        isPending: false,
        isSuccess: true,
        isError: false,
        data: action.payload
      }
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
      data: action.payload
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