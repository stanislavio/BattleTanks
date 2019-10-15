import initialState from '../store/initialState';
import {SET_USER, SET_LOGOUT} from '../actions/login';
// import {SET_LOGOUT} from '../actions/logout';

// import { authenticate } from '../actions/authentication';

export const reducer = (state = initialState.user, action) => {
    //state = state || initialState.user;
    switch (action.type) {
        case SET_USER:
            return action.payload;

        // case authenticate.SET_AUTHENTICATE:
        //     localStorage.setItem("token", action.payload.token);
        //     return action.payload;

        case SET_LOGOUT:
            return initialState.user;

        
        default:
            return state;    
    }
}