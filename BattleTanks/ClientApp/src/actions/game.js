import Service from '../service/BattleTanksService';
import Map from '../components/game/oop/map';
import Sprite from '../components/game/oop/sprite';
const api_serv = new Service();

export const SET_DEFAULT_GAME = "SET_DEFAULT_GAME",
            SET_MAP_GAME = "SET_MAP_GAME",
            SET_TANK_GAME = "SET_TANK_GAME",
            SET_GAME_PENDING = "SET_GAME_PENDING",
            SET_GAME_SUCCESS = "SET_GAME_SUCCESS",
            SET_GAME_ERROR = "SET_GAME_ERROR",
            SET_CANVAS_GAME = "SET_CANVAS_GAME",
            RESET_GAME = "RESET_GAME";

export function set_game(ctx, player, id) {
    return dispatch =>{
        //TODO: Change on load for new game
        dispatch({
            type: SET_GAME_PENDING
        });
        dispatch({
            type: SET_CANVAS_GAME,
            payload: ctx
        });
        var res = api_serv.getMap('7e9c82a3-86b7-4a39-286b-08d7b9553957');
        res.then(response => {
          if(response.error == null){
            const map = new Map(response.wallIcon, response.coordinates);
            dispatch({
                type: SET_MAP_GAME,
                payload: map
            });
            res = api_serv.getTank('7e9c82a3-86b7-4a39-286b-08d7b9553957');
            res.then(response => {
                if(response.error == null){
                  const tank = new Sprite(response.photoUrl, 25, 25);
                  dispatch(
                      {
                          type: SET_TANK_GAME,
                          payload: tank
                      }
                  );
                  
          
                    dispatch({
                      type: SET_GAME_SUCCESS
                  });
                }
                else{
                      console.log(response.error);
                }
              });
          }
          else{
                console.log(response.error);
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