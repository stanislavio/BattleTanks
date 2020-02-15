import React from 'react';

export default class Map{

    constructor(
        wall, coordinates
    ){
        this.wall = wall;
        this.coor = coordinates;
        const img = new Image();
        img.src = wall;
        this.img = img;
    }

    draw(ctx){
        var i = 0;
        const mapArr = this.coor.split('|');
        mapArr.forEach(element => {
            var j = 0;
            element.split(',').forEach(el => {
                if(el.trim() == '1'){
                    ctx.drawImage(this.img, j*this.img.width, i*this.img.height);
                }
                j++;
            });
            i++;
        });

    }

}