import { RIGHT, LEFT, UP, DOWN } from './constants'

export default class Sprite{

    constructor(icon, x, y, direct=RIGHT){
        this.icon = icon;
        this.x = x;
        this.y = y;
        this.direct = direct;
    }

    draw(ctx) {
        ctx.drawImage(this.icon, this.x, this.y);
    }

    move(key, ctx){
        ctx.clearRect(this.x, this.y, 50, 50);
        switch(key){
            case 'a':
                this.x -= 1;
                break;
            case 'w':
                this.y -= 1; 
                break;
            case 's': 
                this.y += 1;
                break;
            case 'd': 
                this.x += 1;
                break;
        }
        this.draw(ctx);
    }

}