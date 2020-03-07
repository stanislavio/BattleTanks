
import Service from '../service/BattleTanksService';
import { setUser } from './login';
const api_serv = new Service();

export const SET_REGISTER_PENDING = "SET_REGISTER_PENDING";
export const SET_REGISTER_SUCCESS = "SET_REGISTER_SUCCESS";
export const SET_REGISTER_ERROR = "SET_REGISTER_ERROR";
export const RESET_REGISTER = "RESET_REGISTER";

  export default function register(data){

      return dispatch => {

          dispatch(setRegisterPending(true));

          const res = api_serv.setRegister(data);

          res.then(response => {
              if(response.error == null){
                  dispatch(setRegisterSuccess(true));
                }else{
                  dispatch(setRegisterError(response.error));
                }
              });   
      }
  }

  export function resetRegister(){
    return {
      type: RESET_REGISTER
    }
  }


  export function setRegisterPending(val) {
    return {
      type: SET_REGISTER_PENDING,
      payload: val
    };
  }
  
  export function setRegisterSuccess(val) {
    return {
      type: SET_REGISTER_SUCCESS,
      payload: val
    };
  }
  
  export function setRegisterError(val) {
    return {
      type:SET_REGISTER_ERROR,
      payload: val
    };
  }

  export function confirmEmail(data){
    return dispatch => {

      dispatch(setRegisterPending(true));

      const res = api_serv.setConfirmEmail(data);

      res.then(response => {
          if(response.error == null){
              dispatch(setUser(response));
              dispatch(setRegisterSuccess(true));
              
              localStorage.setItem('token', response.token);
              
              localStorage.setItem('id', response.id);
              
            }else{
              dispatch(setRegisterError(response.error));
            }
          });   
        }
  }


  
