export const SET_DEFAULT_GAME = "SET_DEFAULT_GAME";

export default function set_game(ctx, player) {
    return dispatch =>{
        dispatch({type: SET_DEFAULT_GAME,
        payload: s_g(ctx, player)});
    }   
}

function s_g(ctx, player) {
    return {
        ctx: ctx,
        player: player
    }
}