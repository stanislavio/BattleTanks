import { RIGHT, LEFT, UP, DOWN, WIDTH, HEIGHT, ICON_H, ICON_W } from './constants'

export default class Bullet{

    constructor(icon, speed, owner_id){
        this.img = new Image();
        this.img.src = icon;
        this.width = ICON_H;
        this.height = ICON_W;
        this.speed = speed;
        this.map = [];
        this.radius = Math.floor((ICON_W + ICON_H) / 2);
        this.enemies = [];
        this.owner_id = owner_id;
    }

    position(x, y){
        this.center_x = x;
        this.center_y = y;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }
        
    draw(ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    move(ctx){
        this.draw(ctx);
        this.x = this.center_x - this.width / 2;
        this.y = this.center_y - this.height / 2;
        let res = null;
        switch(this.direct){
            case LEFT:
                this.center_x -= this.speed * 0.2;
                res = this.checkColision();
                if(res.colision)   
                {
                    this.center_x += this.speed * 0.2;
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                    return res;
                }
                break;
            case UP:
                this.center_y -= this.speed * 0.2; 
                res = this.checkColision();
                if(res.colision)   
                {
                    this.center_y += this.speed * 0.2; 
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                    return res;
                }
                break;
            case DOWN: 
                this.center_y += this.speed * 0.2;
                res = this.checkColision();
                if(res.colision)   
                {
                    this.center_y -= this.speed * 0.2; 
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                    return res;
                }
                break;
            case RIGHT: 
                this.center_x += this.speed * 0.2;
                res = this.checkColision();
                if(res.colision)   
                {
                    this.center_x -= this.speed * 0.2; 
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                    return res;
                }
                break;
        }    
        return {colision: false, coor: {x: -1, y: -1}};
    }

    _getDistance(x1, y1, x2, y2){
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2-y1, 2));
    }

    checkColision(){
        let x1_coor, x2_coor, y1_coor, y2_coor;
        const x_wall = Math.floor(WIDTH / this.width), y_wall = Math.floor(HEIGHT / this.height)

        for(var i = 0; i < this.enemies.length; i++){
            if(this._getDistance(this.enemies[i].center_x, this.enemies[i].center_y, this.center_x, this.center_y) <= this.enemies[i].width / 2 + this.width / 2)
                return {colision: true, coor: {x: -1, y: -1}, enemy: this.enemies[i]};
        }

        switch(this.direct){
            case UP:
                x1_coor = Math.floor((this.center_x - this.width / 4 + 1)/this.width); 
                y1_coor = Math.floor((this.center_y - this.height / 4 + 1)/this.height);
                x2_coor = Math.floor((this.center_x + this.width / 4 - 1) / this.width);
                if(x1_coor < 0 || 
                    x2_coor < 0 || 
                    y1_coor < 0 || 
                    x1_coor >= x_wall ||
                    x2_coor >= x_wall ||
                    y1_coor >= y_wall)
                    return {colision: true, coor: {x: -1, y: -1}};
                if(this.map[y1_coor][x1_coor] != 0)
                    return {colision: true, coor: {x: x1_coor, y: y1_coor}}; 
                if(this.map[y1_coor][x2_coor] != 0)
                    return {colision: true, coor: {x: x2_coor, y: y1_coor}}; 
                break; 
            case DOWN:
                x1_coor = Math.floor((this.center_x - this.width / 4 + 1)/this.width); 
                y1_coor = Math.floor((this.center_y + this.height / 4 - 1)/this.height);
                x2_coor = Math.floor((this.center_x + this.width / 4 - 1) / this.width);
                if(x1_coor < 0 || 
                    x2_coor < 0 || 
                    y1_coor < 0 || 
                    x1_coor >= x_wall ||
                    x2_coor >= x_wall ||
                    y1_coor >= y_wall)
                    return {colision: true, coor: {x: -1, y: -1}};
                if(this.map[y1_coor][x1_coor] != 0)
                    return {colision: true, coor: {x: x1_coor, y: y1_coor}}; 
                if(this.map[y1_coor][x2_coor] != 0)
                    return {colision: true, coor: {x: x2_coor, y: y1_coor}}; 
                break;
            case LEFT:
                x1_coor = Math.floor((this.center_x - this.width / 4 + 1)/this.width);
                y1_coor = Math.floor((this.center_y - this.height / 4 + 1)/this.height);
                y2_coor = Math.floor((this.center_y + this.height / 4 - 1)/this.height);
                if(x1_coor < 0 || 
                    y1_coor < 0 || 
                    x1_coor >= x_wall ||
                    y2_coor >= y_wall ||
                    y1_coor >= y_wall)
                    return {colision: true, coor: {x: -1, y: -1}};
                if(this.map[y1_coor][x1_coor] != 0)
                    return {colision: true, coor: {x: x1_coor, y: y1_coor}}; 
                if(this.map[y2_coor][x1_coor] != 0)
                    return {colision: true, coor: {x: x1_coor, y: y2_coor}}; 
                break;
            case RIGHT:
                x1_coor = Math.floor((this.center_x + this.width / 4 - 1)/this.width);
                y1_coor = Math.floor((this.center_y - this.height / 4 + 1)/this.height);
                y2_coor = Math.floor((this.center_y + this.height / 4 - 1)/this.height);
                if(x1_coor < 0 || 
                    y1_coor < 0 || 
                    x1_coor >= x_wall ||
                    y2_coor >= y_wall ||
                    y1_coor >= y_wall)
                    return {colision: true, coor: {x: -1, y: -1}};
                if(this.map[y1_coor][x1_coor] != 0)
                    return {colision: true, coor: {x: x1_coor, y: y1_coor}}; 
                if(this.map[y2_coor][x1_coor] != 0)
                    return {colision: true, coor: {x: x1_coor, y: y2_coor}}; 
                break;
        }
        return {colision: false, coor: {x: -1, y: -1}};
    }

} 