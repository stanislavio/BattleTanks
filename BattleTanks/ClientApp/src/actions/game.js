import Service from '../service/BattleTanksService';
import Map from '../components/game/oop/map';
import Sprite from '../components/game/oop/sprite';
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
            SET_PLAYERS_SUCCESS = "SET_PLAYERS_SUCCESS";

export function set_canvas(ctx) {
    return dispatch =>{
        dispatch({
            type: SET_CANVAS_GAME,
            payload: ctx
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
        coor = coor.map((e) => (e.split(',')));
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

export function setPlayers(gameId){
    return dispatch => {
      dispatch({
        type: SET_PLAYERS_PENDING
      });
      var res = api_serv.getPlayers(gameId);
      res.then(response => {
        if(response.error == null){
            let players = response.map((x) => (new Sprite(x.tank.tankPhotoUrl, 25, 25, x.tank.tankSpeed, x.userInfo)));
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