import initialState from '../store/initialState';
import { SET_USERS_ERROR, SET_USERS_SUCCESS, SET_USERS_PENDING} from '../actions/users';


export const reducer = (state = initialState.users, action) => {

    switch (action.type) {
        case SET_USERS_PENDING:
            return Object.assign({}, state, {
                isPending: true,
                isSuccess: false,
                isError: null
              });

        case SET_USERS_SUCCESS:
            return Object.assign({}, state, {
                isPending: false,
                isSuccess: true,
                isError: null,
                data: action.payload
              });
            
        case SET_USERS_ERROR:
            return Object.assign({}, state, {
                    isPending: false,
                    isSuccess: false,
                    isError: action.payload
                });
        
        default:
            return state;    
    }
}