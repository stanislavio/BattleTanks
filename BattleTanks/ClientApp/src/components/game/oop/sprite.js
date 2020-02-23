import { RIGHT, LEFT, UP, DOWN } from './constants'

export default class Sprite{

    constructor(icon, x, y, direct=RIGHT){
        this.img = icon;
        this.width = this.img.width;
        this.height = this.img.height;
        this.center_x = x;
        this.center_y = y;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.direct = direct;
        this.angle = 0; 
        }

    draw(ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
                this.angle = 180;
                this.center_x -= 1;
                break;
            case 'w':
                this.angle = -90;
                this.center_y -= 1; 
                break;
            case 's': 
                this.angle = 90;
                this.center_y += 1;
                break;
            case 'd': 
                this.angle = 0;
                this.center_x += 1;
                break;
        }    
        
        this.draw(ctx);
    }

}