import Service from "../service/BattleTanksService";
const api_serv = new Service();

export const SET_USER_PENDING = "SET_USER_PENDING";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_ERROR = "SET_USER_ERROR";

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
