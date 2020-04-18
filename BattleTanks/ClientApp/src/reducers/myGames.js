import {
    SET_OPENED_GAME_ERROR,
    SET_OPENED_GAME_PENDING,
    SET_OPENED_GAME_SUCCESS,
  } from "../actions/profile";
  import initialState from "../store/initialState";
  
  export const reducer = (state = initialState.myGames, action) => {
    switch (action.type) {
      case SET_OPENED_GAME_PENDING:
        return Object.assign({}, state, {
          isSuccess: false,
          isError: null,
          isPending: true,
        });
  
      case SET_OPENED_GAME_SUCCESS:
        return Object.assign({}, state, {
          isSuccess: true,
          isError: null,
          isPending: false,
          data: action.payload,
        });
  
      case SET_OPENED_GAME_ERROR:
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
  