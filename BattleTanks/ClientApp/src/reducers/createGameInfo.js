import {
  CREATEGAME_ERROR,
  CREATEGAME_PENDING,
  CREATEGAME_SUCCESS
} from "../actions/game";
import initialState from "../store/initialState";

export const reducer = (state = initialState.createGameInfo, action) => {
  switch (action.type) {
    case CREATEGAME_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        isSuccess: true,
        isError: false,
        data: action.payload
      });

    case CREATEGAME_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        isSuccess: false,
        isError: false
      });

    case CREATEGAME_ERROR:
      return Object.assign({}, state, {
        isPending: false,
        isSuccess: false,
        isError: true,
        data: action.payload
      });

    default:
      return state;
  }
};
