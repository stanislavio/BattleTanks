
import initialState from '../store/initialState';
import {
   INITIAL_CONNECTION, RESET_HUB
}from '../actions/game';

export const reducer = (
    state = initialState.hub,
    action
  ) => {
    switch (action.type) {
      case INITIAL_CONNECTION:
        return action.payload;

      case RESET_HUB:
          return null
       default: 
          return state;
    }
}  