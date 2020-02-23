
export default class GameContainer{


    constructor(
        ctx,
        map, 
        players
    ){
        this.ctx = ctx;
        this.map = map;
        this.players = players;        
    }


    draw(){
        this.map.draw(this.ctx);
        this.players.draw(this.ctx);
    }

}