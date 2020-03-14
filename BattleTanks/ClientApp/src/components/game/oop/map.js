import React from 'react';

export default class Map{

    constructor(
        photos, coordinates
    ){
        this.photos = photos.map((x) => {
            let img = new Image();
            img.src = x.photoUrl;
            return {
            title: x.title,
            icon: img
            }
        });
        this.coor = coordinates;
        
    }

    draw(ctx){
        var i = 0;
        this.coor.forEach(element => {
            var j = 0;
            element.forEach(el => {
                if(el.trim() != '0'){
                    let img = this.photos.find((e) => (e.title == el.trim())).icon;
                    ctx.drawImage(img, j*50, i*50);
                }
                j++;
            });
            i++;
        });

    }

}