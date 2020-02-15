import Service from '../service/BattleTanksService';
import Map from '../components/game/oop/map';
const api_serv = new Service();

export const SET_DEFAULT_GAME = "SET_DEFAULT_GAME";

export default function set_game(ctx, player, id) {
    return dispatch =>{
        const res = api_serv.getMap(id);
        res.then(response => {
          if(response.error == null){
            const map = new Map(response.wallIcon, response.coordinates);
            dispatch({type: SET_DEFAULT_GAME,
                payload: s_g(ctx, player, map)});
          }
          else{
                console.log(response.error);
          }
        });
    }   
}

function s_g(ctx, player, map) {
    return {
        ctx: ctx,
        player: player, 
        map: map
    }
}