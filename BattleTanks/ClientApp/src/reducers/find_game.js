import {
    FIND_GAME_ERROR,
    FIND_GAME_PENDING,
    FIND_GAME_SUCCESS,
    RESET_FIND_GAME
 } from "../actions/game";
import initialState from '../store/initialState';

export const reducer = (
  state = initialState.findGame,
  action
) => {
  switch (action.type) {
    case FIND_GAME_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        isSuccess: true,
        isError: false,
        data: action.payload
      });

    case FIND_GAME_PENDING:
    return Object.assign({}, state, {
        isPending: true,
        isSuccess: false,
        isError: false,
    });

    case FIND_GAME_ERROR:
        return Object.assign({}, state, {
            isPending: false,
            isSuccess: false,
            isError: true,
            data: action.payload
        });
        
    case RESET_FIND_GAME: 
        return initialState.findGame;

    default:
      return state;
  }
}