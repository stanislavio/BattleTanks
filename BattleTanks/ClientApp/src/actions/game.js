import Service from "../service/BattleTanksService";
import Map from "../components/game/oop/map";
import Sprite from "../components/game/oop/sprite";
import Bullet from "../components/game/oop/bullet";
import * as SignalR from "@aspnet/signalr";
const api_serv = new Service();

export const CREATEGAME_PENDING = "CREATEGAME_PENDING",
  CREATEGAME_SUCCESS = "CREATEGAME_SUCCESS",
  CREATEGAME_ERROR = "CREATEGAME_ERROR",
  SET_DEFAULT_GAME = "SET_DEFAULT_GAME",
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
  RESET_FIND_GAME = "RESET_FIND_GAME",
  INITIAL_CONNECTION = "INITIAL_CONNECTION",
  RESET_HUB = "RESET_HUB",
  JOINTOGAME_PENDING = "JOINTOGAME_PENDING",
  JOINTOGAME_SUCCESS = "JOINTOGAME_SUCCESS",
  JOINTOGAME_ERROR = "JOINTOGAME_ERROR";

export function initialConnection() {
  return dispatch => {
    const hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`/gameroom`, {
        accessTokenFactory: () => localStorage.getItem("token")
      })
      .build();

    hubConnection
      .start()
      .then(() => {
        console.log("Connection Success");
      })
      .catch(err => console.log("Error while establishing connection :(", err));

    dispatch({
      type: INITIAL_CONNECTION,
      payload: hubConnection
    });
  };
}

export function set_canvas(ctx) {
  return dispatch => {
    dispatch({
      type: SET_CANVAS_GAME,
      payload: ctx
    });
  };
}

export function resetFindGame(){
  return dispatch => {
    dispatch({type: RESET_FIND_GAME});
  }
}

export function findGame() {
  return dispatch => {
    dispatch({
      type: FIND_GAME_PENDING
    });
    var res = api_serv.findGame();
    res.then(response => {
      if (response.error == null) {
        dispatch({
          type: FIND_GAME_SUCCESS,
          payload: response
        });
      } else {
        dispatch({
          type: FIND_GAME_ERROR,
          payload: response
        });
      }
    });
  };
}

export function createGame(data) {
  return dispatch => {
    dispatch({ type: CREATEGAME_PENDING });
    var res = api_serv.createGame(data);
    res.then(response => {
      console.log(response);
      if (response.error == null) {
        dispatch({ type: CREATEGAME_SUCCESS, payload: response });
      } else {
        dispatch({ type: CREATEGAME_ERROR, payload: response });
      }
    });
  };
}

export function setGame(gameId) {
  return dispatch => {
    dispatch({
      type: SET_MAP_PENDING
    });
    var res = api_serv.getGameInfo(gameId);
    res.then(response => {
      if (response.error == null) {
        console.log('response');
        console.log(response);
        let coor = response.map.coordinates.split("|");
        coor = coor.map(e => e.split(",").map(x => parseInt(x.trim())));
        let map = new Map(response.map.photos, coor);
        dispatch({
          type:SET_GAME_SUCCESS,
          payload: response
        });
        dispatch({
          type: SET_MAP_SUCCESS,
          payload: map
        });
      } else {
        dispatch({
          type: SET_MAP_ERROR
        });
      }
    });
  };
}

export function saveGameData(data) {
  return dispatch => {
    var res = api_serv.saveGameData(data);
  };
}

export function saveGameMapData(data) {
  return dispatch => {
    var res = api_serv.saveGameMapData(data);
  };
}

export function setPlayers(gameId) {
  return dispatch => {
    dispatch({
      type: SET_PLAYERS_PENDING
    });
    var res = api_serv.getPlayers(gameId);
    res.then(response => {
      if (response.error == null) {
        let players = response.map(x => {
          const bullet = new Bullet(x.tank.bulletPhotoUrl, x.tank.bulletSpeed);
          const coor = JSON.parse(x.coordinates);
          x.userInfo.online = x.online;
          let p = new Sprite(
            x.tank.tankPhotoUrl,
            coor.x,
            coor.y,
            x.tank.tankSpeed,
            x.userInfo,
            bullet,
            coor.direct
          );
          p.lives = 5 - x.diedCount;
          return p;
        });
        dispatch({
          type: SET_PLAYERS_SUCCESS,
          payload: players
        });
      } else {
        dispatch({
          type: SET_PLAYERS_ERROR
        });
      }
    });
  };
}

export function reset_game() {
  return dispatch => {
    dispatch({
      type: RESET_GAME
    });
  };
}

export function joinToGame(gameId, tankId) {
  return dispatch => {
    dispatch({
      type: JOINTOGAME_PENDING
    });

    const data = {
      GameId: gameId,
      TankId: tankId
    };
    var res = api_serv.joinToGame(data);
    res.then(response => {
      if (response.error == null) {
        dispatch({
          type: JOINTOGAME_SUCCESS,
          payload: gameId
        });
      } else {
        dispatch({
          type: JOINTOGAME_ERROR
        });
      }
    });
  };
}
