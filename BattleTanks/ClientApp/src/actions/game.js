import Service from '../service/BattleTanksService';
import Map from '../components/game/oop/map';
import Sprite from '../components/game/oop/sprite';
import Bullet from '../components/game/oop/bullet';
import * as SignalR from '@aspnet/signalr';
const api_serv = new Service();

export const SET_DEFAULT_GAME = "SET_DEFAULT_GAME",
            SET_MAP_PENDING = "SET_MAP_PENDING",
            SET_MAP_ERROR = "SET_MAP_ERROR",
            SET_MAP_SUCCESS = "SET_MAP_SUCCESS",
            SET_TANK_GAME = "SET_TANK_GAME",
            SET_GAME_PENDING = "SET_GAME_PENDING",
            SET_GAME_SUCCESS = "SET_GAME_SUCCESS",
            SET_GAME_ERROR = "SET_GAME_ERROR",
            SET_CANVAS_GAME = "SET_CANVAS_GAME",
            RESET_GAME = "RESET_GAME",
            SET_PLAYERS_PENDING = "SET_PLAYERS_PENDING",
            SET_PLAYERS_ERROR = "SET_PLAYERS_ERROR",
            SET_PLAYERS_SUCCESS = "SET_PLAYERS_SUCCESS",
            FIND_GAME_PENDING = "FIND_GAME_PENDING",
            FIND_GAME_SUCCESS = "FIND_GAME_SUCCESS",
            FIND_GAME_ERROR = "FIND_GAME_ERROR",
            
            INITIAL_CONNECTION = "INITIAL_CONNECTION",
            RESET_HUB = "RESET_HUB";

export function initialConnection() {
  return dispatch => {
      console.log(`${window.location.origin}/gameRoom`);
      const hubConnection = new SignalR.HubConnectionBuilder().withUrl(`/gameroom`,
          { accessTokenFactory: () => (localStorage.getItem('token')) }).build();

      hubConnection
          .start()
          .then(() =>{ 
            console.log('Connection Success');
            hubConnection.on('ReceiveMsg', (data) => {
                  console.log('receive data')
                  console.log(data);
                  // dispatch(ReceiveMsg(data));
          });
      }
          )
          .catch(err => console.log('Error while establishing connection :(', err));

      dispatch({
          type: INITIAL_CONNECTION,
          payload: hubConnection
      });
  }
}



export function set_canvas(ctx) {
    return dispatch =>{
        dispatch({
            type: SET_CANVAS_GAME,
            payload: ctx
        });
    }   
}

export function findGame(){
  return dispatch => {
    dispatch({
      type: FIND_GAME_PENDING
    });
    var res = api_serv.findGame();
    res.then(response => {
      console.log(response);
      if(response.error == null){

        dispatch({
          type: FIND_GAME_SUCCESS,
          payload: response
        });

        }else{
          dispatch({
            type: FIND_GAME_ERROR,
            payload: response
          });
        }
      });
  }
}

export function createGame(data){
  return dispatch => {
  var res = api_serv.createGame(data);
  res.then(response => {
    if(response.error == null){
        console.log('Success');
      }else{
        console.log('Error');
      }
    });
}
}

export function setGame(gameId){

  return dispatch => {
    dispatch({
              type: SET_MAP_PENDING
          });
    var res = api_serv.getGameInfo(gameId);
      res.then(response => {
        if(response.error == null){
        let coor = response.map.coordinates.split('|');
        coor = coor.map((e) => (e.split(',').map((x) => (parseInt(x.trim())))));
          let map = new Map(response.map.photos, coor);
            dispatch({
              type: SET_MAP_SUCCESS,
              payload: map
            });
          }else{
              dispatch({
                type: SET_MAP_ERROR
              });
          }
        });
  }

}

export function saveGameData(data){
    return dispatch => {
      var res = api_serv.saveGameData(data);
    }
}

export function saveGameMapData(data){
  return dispatch => {
    var res = api_serv.saveGameMapData(data);
  }
}

export function setPlayers(gameId){
    return dispatch => {
      dispatch({
        type: SET_PLAYERS_PENDING
      });
      var res = api_serv.getPlayers(gameId);
      res.then(response => {
        if(response.error == null){
          console.log(response);
            let players = response.map((x) => {
              const bullet = new Bullet(x.tank.bulletPhotoUrl, x.tank.bulletSpeed);
              const coor = JSON.parse(x.coordinates);
              return new Sprite(x.tank.tankPhotoUrl, coor.x, coor.y, x.tank.tankSpeed, x.userInfo, bullet, coor.direct)
            });
            dispatch({
              type: SET_PLAYERS_SUCCESS,
              payload: players
            });
          }else{
              dispatch({
                type: SET_PLAYERS_ERROR
              });
          }
        });
    }
}


export function reset_game(){
  return dispatch => {
    dispatch({
      type: RESET_GAME
    });
  }
}