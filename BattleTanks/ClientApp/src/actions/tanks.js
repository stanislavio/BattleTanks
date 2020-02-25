import Service from '../service/BattleTanksService';
export const SET_TANK_SUCCESS="SET_TANK_SUCCESS", 
            SET_TANK_PENDING='SET_TANK_PENDING',
            SET_TANK_ERROR='SET_TANK_ERROR',
            GET_TANKS = 'GET_TANKS';


const api_serv = new Service();

export const ADD_TANK = "ADD_MAP";

export function add_tank(data) {
    return dispatch => {
    dispatch(Pending());
    const res = api_serv.addTank(data);
    res.then(response => {
        if(response.error == null){
            dispatch(Success())
        }else{
            dispatch(Error())
        }
    });
    }
}

export function get_tanks(){
    return dispatch => {
        dispatch(Pending());
        const res = api_serv.getTanks();
        res.then(response => {
        if(response.error == null){
            dispatch(getTanks(response));
            dispatch(Success());
        }else{
            dispatch(Error());
        }
    });
    }
}

function getTanks(data){
    return{
        type: GET_TANKS,
        payload: data
    }
}

export function Success() {
    return {
        type: SET_TANK_SUCCESS
    }
}

export function Pending() {
    return {
        type: SET_TANK_PENDING
    }
}
export function Error() {
    return {
        type: SET_TANK_ERROR
    }
}
    

