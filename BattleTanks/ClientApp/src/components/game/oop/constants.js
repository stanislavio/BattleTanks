
export const RIGHT = 'right', LEFT = 'left', UP = 'up', DOWN = 'down';


let width = Math.floor(window.screen.width/10) * 10 - 60, 
    height = Math.floor(window.screen.height/10) * 10 - 210;

let icon_w =  width / 26, icon_h = height / 11;

if(!Number.isInteger(icon_w))
    icon_w = Math.ceil(icon_w)
if(!Number.isInteger(icon_h))
    icon_h = Math.ceil(icon_h)


export const WIDTH = icon_w * 26, 
             HEIGHT = icon_h * 11;

export const ICON_W = icon_w,
             ICON_H = icon_h;

console.log(ICON_W, ICON_H);