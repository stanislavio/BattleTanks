import Service from '../service/BattleTanksService';
export const SET_ADMIN_SUCCESS="SET_ADMIN_SUCCESS", 
            SET_ADMIN_PENDING='SET_ADMIN_PENDING',
            SET_ADMIN_ERROR='SET_ADMIN_ERROR';

const api_serv = new Service();

export const ADD_MAP = "ADD_MAP";

export default function add_map(data) {
    return dispatch => {
    console.log(data);
    dispatch(Pending())
    const res = api_serv.addMap(data);
    res.then(response => {
        if(response.error == null){
            dispatch(Success())
            console.log(response);
        }else{
            dispatch(Error())
            console.log(response.error);
        }
    });
    }
}

export function Success() {
    return {
        type: SET_ADMIN_SUCCESS
    }
}

export function Pending() {
    return {
        type: SET_ADMIN_PENDING
    }
}
export function Error() {
    return {
        type: SET_ADMIN_ERROR
    }
}
    

