import Service from '../service/BattleTanksService';
export const SET_ADMIN_SUCCESS="SET_ADMIN_SUCCESS", 
            SET_ADMIN_PENDING='SET_ADMIN_PENDING',
            SET_ADMIN_ERROR='SET_ADMIN_ERROR',
            SET_MAPS = 'SET_MAPS';


const api_serv = new Service();

export const ADD_MAP = "ADD_MAP";

export function add_map(data) {
    return dispatch => {
    dispatch(Pending());
    const res = api_serv.addMap(data);
    res.then(response => {
        if(response.error == null){
            dispatch(Success())
        }else{
            dispatch(Error())
        }
    });
    }
}

export function get_map(){
    return dispatch => {
        dispatch(Pending());
        const res = api_serv.getMaps();
        res.then(response => {
        if(response.error == null){
            dispatch(set_maps(response));
            dispatch(Success());
        }else{
            dispatch(Error());
        }
    });
    }
}

function set_maps(data){
    return{
        type: SET_MAPS,
        payload: data
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
    

