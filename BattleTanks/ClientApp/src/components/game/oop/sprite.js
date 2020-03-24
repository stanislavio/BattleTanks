import { RIGHT, LEFT, UP, DOWN, WIDTH, HEIGHT, ICON_W, ICON_H } from './constants'

export default class Sprite{

    constructor(icon, x, y, speed, info, bullet, direct=RIGHT){
        this.img = new Image()
        this.img.src = icon;
        this.width = ICON_W;
        this.height = ICON_H;
        this.center_x = x;
        this.center_y = y;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.direct = direct;
        this.angle = 0;   
        this.map = [];
        this.info = info;
        this.speed = speed;
        this.bullet = bullet;
        this.died = false;
    }

        
    draw(ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        switch(this.direct){
            case UP:
                this.angle = -90;
                break;
            case DOWN:
                this.angle = 90;
                break;
            case LEFT:
                this.angle = 180;
                break;
            case RIGHT: 
                this.angle = 0;
                break;
        }
        this.drawRotatedImage(ctx, this.img, this.angle, this.center_x, this.center_y)
    }

    drawRotatedImage(ctx, image, angle, x, y)
    {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle / 180 * Math.PI);
        ctx.drawImage(image, -this.width / 2, -this.height / 2 - 1);
        ctx.restore();
    }

    move(key, ctx){
        this.x = this.center_x - this.width / 2;
        this.y = this.center_y - this.height / 2;
        switch(key){
            case 'a':
                this.center_x -= this.speed * 0.2;
                this.direct = LEFT;
                if(this.checkColision())   
                {
                    this.center_x += this.speed * 0.2; 
                }
                break;
            case 'w':
                this.center_y -= this.speed * 0.2; 
                this.direct = UP;
                if(this.checkColision())   
                {
                    this.center_y += this.speed * 0.2; 
                }
                break;
            case 's': 
                this.center_y += this.speed * 0.2;
                this.direct = DOWN;
                if(this.checkColision())   
                {
                    this.center_y -= this.speed * 0.2; 
                }
                break;
            case 'd': 
                this.center_x += this.speed * 0.2;
                this.direct = RIGHT;
                if(this.checkColision())   
                {
                    this.center_x -= this.speed * 0.2; 
                }
                break;
        }    
   
        this.draw(ctx);
    }

    checkColision(){
        let x1_coor, x2_coor, y1_coor, y2_coor;
        const x_wall = Math.floor(WIDTH / this.width), y_wall = Math.floor(HEIGHT / this.height) 
        switch(this.direct){
            case UP:

                x1_coor = Math.floor((this.center_x - this.width / 2 + 1)/this.width); 
                y1_coor = Math.floor((this.center_y - this.height / 2 + 1)/this.height);
                x2_coor = Math.floor((this.center_x + this.width / 2 - 1) / this.width);
                if(x1_coor < 0 || 
                    x2_coor < 0 || 
                    y1_coor < 0 || 
                    x1_coor >= x_wall ||
                    x2_coor >= x_wall ||
                    y1_coor >= y_wall){
                    return true;
                    }
                if(this.map[y1_coor][x1_coor] != 0 || this.map[y1_coor][x2_coor] != 0){
                    return true; 
                }
                break; 
            case DOWN:
                x1_coor = Math.floor((this.center_x - this.width / 2 + 1)/this.width);
                y1_coor = Math.floor((this.center_y + this.height / 2 - 1)/this.height);
                x2_coor = Math.floor((this.center_x + this.width / 2 - 1) / this.width);
                if(x1_coor < 0 || 
                    x2_coor < 0 || 
                    y1_coor < 0 || 
                    x1_coor >= x_wall ||
                    x2_coor >= x_wall ||
                    y1_coor >= y_wall)
                    return true;
                if(this.map[y1_coor][x1_coor] != 0 || this.map[y1_coor][x2_coor] != 0)
                    return true; 
                break;
            case LEFT:
                x1_coor = Math.floor((this.center_x - this.width / 2 + 1)/this.width);
                y1_coor = Math.floor((this.center_y - this.height / 2 + 1)/this.height);
                y2_coor = Math.floor((this.center_y + this.height / 2 - 1)/this.height);
                if(x1_coor < 0 || 
                    y1_coor < 0 || 
                    x1_coor >= x_wall ||
                    y2_coor >= y_wall ||
                    y1_coor >= y_wall)
                    return true;
                if(this.map[y1_coor][x1_coor] != 0 || this.map[y2_coor][x1_coor] != 0)
                    return true; 
            case RIGHT:
                x1_coor = Math.floor((this.center_x + this.width / 2 - 1)/this.width);
                y1_coor = Math.floor((this.center_y - this.height / 2 + 1)/this.height);
                y2_coor = Math.floor((this.center_y + this.height / 2 - 1)/this.height);
                if(x1_coor < 0 || 
                    y1_coor < 0 || 
                    x1_coor >= x_wall ||
                    y2_coor >= y_wall ||
                    y1_coor >= y_wall)
                    return true;
                if(this.map[y1_coor][x1_coor] != 0 || this.map[y2_coor][x1_coor] != 0)
                    return true; 
        }
        return false;
    }

} 