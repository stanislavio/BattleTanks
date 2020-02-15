import { RIGHT, LEFT, UP, DOWN } from './constants'

export default class Sprite{

    constructor(icon, x, y, direct=RIGHT){
        this.icon = icon;
        this.img = icon;
        this.x = x;
        this.y = y;
        this.direct = direct;
        this.width = this.img.width;
        this.height = this.img.height;
        this.angle = 0; 
        }

    draw(ctx, map) {
        this.drawRotatedImage(ctx, this.img, this.angle, this.x, this.y)
        map.draw(ctx);
    }

    drawRotatedImage(ctx, image, angle, x, y)
    {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle / 180 * Math.PI);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
    }

    move(key, ctx, map){
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fill();
        switch(key){
            case 'a':
                this.angle = 180;
                this.x -= 1;
                break;
            case 'w':
                this.angle = -90;
                this.y -= 1; 
                break;
            case 's': 
                this.angle = 90;
                this.y += 1;
                break;
            case 'd': 
                this.angle = 0;
                this.x += 1;
                break;
        }    
        this.draw(ctx, map);
    }

}