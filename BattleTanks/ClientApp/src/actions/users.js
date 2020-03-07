import Service from '../service/BattleTanksService';
export const SET_USERS_SUCCESS="SET_TANK_SUCCESS", 
            SET_USERS_PENDING='SET_TANK_PENDING',
            SET_USERS_ERROR='SET_TANK_ERROR';


const api_serv = new Service();

export function getUsers(){
    return dispatch => {
        dispatch(Pending());
        const res = api_serv.getUsers();
        res.then(response => {
            if(response.error == null){
                dispatch(Success(response))
            }else{
                dispatch(Error())
            }
        });
    };
}


export function Success(data) {
    return {
        type: SET_USERS_SUCCESS,
        payload: data
    }
}

export function Pending() {
    return {
        type: SET_USERS_PENDING
    }
}
export function Error() {
    return {
        type: SET_USERS_ERROR
    }
}
    

