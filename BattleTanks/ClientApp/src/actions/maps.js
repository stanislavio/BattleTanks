import Service from '../service/BattleTanksService';

const api_serv = new Service();

export const 
            SET_MAP_GAME = "SET_MAP_GAME",
            GET_MAPS = 'GET_MAPS',
            GET_MAPS_SUCCESS = 'GET_MAPS_SUCCESS',
            GET_MAPS_ERROR = 'GET_MAPS_ERROR',
            GET_MAPS_PENDING = 'GET_MAPS_PENDING';


export const get_maps = () => {

    return dispatch => {
        dispatch({
            type: GET_MAPS_PENDING
        });
        var res = api_serv.getMaps();
        res.then(response => {
            if(response.error == null){
                dispatch({
                    type: GET_MAPS,
                    payload: response
                })
                dispatch(Success())
            }else{
                dispatch(Error())
            }
        });
    };

}


const Success = () => {
    return {
        type: GET_MAPS_SUCCESS
    }
}

const Error = () => {
    return {
        type: GET_MAPS_ERROR
    }
}
