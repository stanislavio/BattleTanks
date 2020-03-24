import React, { Component } from 'react';
import './game.css';
import { LEFT, RIGHT, UP, DOWN, WIDTH, HEIGHT } from './oop/constants';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import ReactInterval from 'react-interval';

export default class Game extends Component{    
    
    state = {
        bullets: []
    }

    addBullet = (bullet) => {
        this.setState({
            bullets: this.state.bullets.concat([bullet])
        });
    }

    deleteBullet = (bullet) => {
        this.setState({
            bullets: this.state.bullets.filter((el) => (el != bullet))
        });   
    }

    render(){
        console.log(WIDTH, HEIGHT);
        let { players, ctx, map } = this.props.game;
        const { current_user } = this.props;
        players = players.data.map((x) => {
            x.map = map.data.coor;
            return x;
        });
        let current_player = players.find((x) => (x.info.id == current_user.id));
        map.data.draw(ctx);

        players.forEach((x) => {if(!x.died) x.draw(ctx)});

        return  <><KeyboardEventHandler
                handleKeys={['w', 'a', 's', 'd', 'space']}
                onKeyEvent={(key, e) => {
                    if(key == 'space'){
                        let bullet = current_player.bullet;
                        let x = current_player.center_x;
                        let y = current_player.center_y;
                        switch(current_player.direct){
                            case DOWN:
                                y += current_player.height;
                                break;
                            case UP:
                                y -= current_player.height;
                                break;    
                            case LEFT:
                                x -= current_player.width;
                                break;
                            case RIGHT:
                                x += current_player.width;
                                break;
                        }
                        bullet.position(x, y);
                        bullet.map = current_player.map;
                        bullet.direct = current_player.direct;
                        bullet.enemies = players.filter((el) => (el != current_player && !el.died));
                        this.addBullet(bullet);
                    }
                    current_player.move(key, ctx);
                }
                } />
                {this.state.bullets.length > 0 ?
                <ReactInterval timeout={10} enabled={true}
                    callback={() => {
                        this.state.bullets.forEach(
                            (bullet) => {
                                const b = bullet.move(this.props.game.ctx);
                                if (b.colision)
                                {
                                  if(Object.keys(b).includes('enemy')){
                                        players = players.map(x => {
                                            if(x == b.enemy){
                                                x.died = true;
                                            }
                                            return x;
                                        });  
                                    }
                                    const coor_x = b.coor.x;
                                    const coor_y = b.coor.y;

                                    if(coor_x >= 0 && coor_y >= 0){
                                        if(map.data.coor[coor_y][coor_x] > 0)
                                            map.data.coor[coor_y][coor_x] --;
                                    }
                                    this.deleteBullet(bullet);
                                    console.log(players);
                                    players = players.map((x) => {
                                        if(!x.died){
                                            x.map = this.props.game.map.data.coor;
                                            x.draw(ctx);
                                        }else{
                                            ctx.fillStyle = '#000000';
                                            ctx.fillRect(x.x, x.y, x.width, x.height);
                                        }
                                        return x;
                                    });
                                }
                            }
                        );
                    }} /> : null}
            </>
    }
    
}