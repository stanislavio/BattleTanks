import Service from "../service/BattleTanksService";
const api_serv = new Service();

export const SET_USER_PENDING = "SET_USER_PENDING";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_ERROR = "SET_USER_ERROR";

export const SET_OPENED_GAME_PENDING = "SET_OPENED_GAME_PENDING";
export const SET_OPENED_GAME_SUCCESS = "SET_OPENED_GAME_SUCCESS";
export const SET_OPENED_GAME_ERROR = "SET_OPENED_GAME_ERROR";

export default function get_user(userId) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_PENDING,
    });

    const res = api_serv.getUser(userId);
    res.then((response) => {
      if (response.error == null) {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: SET_USER_ERROR,
          payload: response.error,
        });
      }
    });
  };
}


export function getOpenedGames(userId){
  return (dispatch) => {
    dispatch({
      type: SET_OPENED_GAME_PENDING,
    });

    const res = api_serv.getOpenedGames(userId);
    res.then((response) => {
      if (response.error == null) {
        dispatch({
          type: SET_OPENED_GAME_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: SET_OPENED_GAME_ERROR,
          payload: response.error,
        });
      }
    });
  };
}