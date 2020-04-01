import { JOINTOGAME_PENDING, JOINTOGAME_ERROR, JOINTOGAME_SUCCESS } from "../actions/game";

import initialState from '../store/initialState';

export const reducer = (
  state = initialState.infoStatus,
  action
) => {
  switch (action.type) {
    case JOINTOGAME_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        isSuccess: false,
        isError: null
      });

    case JOINTOGAME_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: true,
        isError: null,
        isPending: false,
        data: action.payload
      });

    case JOINTOGAME_ERROR:
      return Object.assign({}, state, {
        isError: action.payload,
        isSuccess: false,
        isPending: false
      });

    default:
      return state;
  }
}