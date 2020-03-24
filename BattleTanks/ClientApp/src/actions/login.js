import Service from '../service/BattleTanksService';
import {initialConnection} from './game';
const api_serv = new Service();

export const SET_LOGIN_PENDING = "SET_LOGIN_PENDING";
export const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
export const SET_USER = "SET_USER";
export const SET_LOGOUT = "SET_LOGOUT";
export const RESET_LOGIN = "RESET_LOGIN";

export default function login(email, password) {

  return dispatch => {
    dispatch(setLoginPending(true));

    const res = api_serv.setLogin({Email: email, Password: password});
    res.then(response => {
      if(response.error == null){
          localStorage.setItem('token', response.token);
          
          localStorage.setItem('id', response.id);

          dispatch(initialConnection());
          dispatch(setUser(response));
          dispatch(setLoginSuccess(true));
         
        }else{
          dispatch(setLoginError(response.error));
        }
      });
  }
}

export function resetLogin(){
  return {
    type: RESET_LOGIN
  }
}

export function setUser(data) {
    return {
      type: SET_USER,
      payload: data
    };
  }

export function setLoginPending(isLoginPending) {
return {
    type: SET_LOGIN_PENDING,
    isLoginPending
};
}

export function setLoginSuccess(isLoginSuccess) {
return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
};
}

export function setLoginError(loginError) {
return {
    type: SET_LOGIN_ERROR,
    loginError
};
}

export async function Authentification(store, token){
  if(!token)
    return;
    const res = await fetch('api/Authentication/loginToken', {
    method: 'post',  
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }),
    });
    if(res.ok){
      const user = await res.json();
      store.dispatch(setUser(user));
      store.dispatch(initialConnection());
    }else{
      localStorage.clear();
  }
}

export function setLogout(){
  return {
    type: SET_LOGOUT
  }
}