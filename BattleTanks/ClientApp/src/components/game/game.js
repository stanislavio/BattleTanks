import React, { Component } from 'react';
import './game.css';
import { LEFT, RIGHT, UP, DOWN, WIDTH, HEIGHT } from './oop/constants';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import ReactInterval from 'react-interval';
import Countdown from 'react-countdown-now';

const direct_dict = {
    'a': LEFT,
    'w': UP,
    's': DOWN,
    'd': RIGHT
}

export default class Game extends Component{    
    
    state = {
        bullets: []
    }

    componentWillMount(){
        console.log('will mount');
        if(this.props.hub != null){
            this.props.hub.on('ReceiveShoot', (data) => {
                const players = this.props.game.players.data;
                const map = this.props.game.map.data.coor;
                let bullet_player = players.find((x) => (x.info.id == data.ownerId));
                bullet_player = bullet_player.bullet;
                bullet_player.direct = data.direct;
                bullet_player.map = map;
                bullet_player.enemies = players.filter((el) => (el.info.id != data.ownerId));
                bullet_player.position(JSON.parse(data.position).x, JSON.parse(data.position).y);
                this.addBullet(bullet_player);
        });
            this.props.hub.on('ReceiveMove', (data) => {

                const map = this.props.game.map.data.coor;
                const players = this.props.game.players.data;
                const current_player = players.find((x) => (x.info.id == data.ownerId));
                console.log('ReceiveMove')
                console.log(data);
                current_player.map = map;
                current_player.move(data.direct, this.props.game.ctx);
                console.log(current_player);
            });
        }
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
                    if(key == 'space' && current_player.last_shoot + current_player.recharge_time < new Date().getTime()){
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
                        bullet.position(x, y, current_player.info.id);
                        bullet.map = current_player.map;
                        bullet.direct = current_player.direct;
                        bullet.enemies = players.filter((el) => (el != current_player && !el.died));
                        this.addBullet(bullet);
                        
                        const model = {
                            Position: '{"x":' + x + ', "y": ' + y + ' }',
                            OwnerId: current_player.info.id,
                            Direct: current_player.direct,
                            Players: players.filter((x) => (x.info.id != current_player.info.id)).map(x => (x.info.id)).join(',') 
                        }
                        this.props.hub
                        .invoke('Shoot', model)
                        .catch(err => { console.log('error'); console.log(err)});

                        current_player.last_shoot = new Date().getTime();
                    }else{            
                        const model = {
                            OwnerId: current_player.info.id,
                            Direct: direct_dict[key],
                            Players: players.filter((x) => (x.info.id != current_player.info.id)).map(x => (x.info.id)).join(',') 
                        }            
                        this.props.hub
                        .invoke('Move', model)
                        .catch(err => { console.log('error'); console.log(err)});

                        current_player.move(direct_dict[key], ctx);
                    }
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