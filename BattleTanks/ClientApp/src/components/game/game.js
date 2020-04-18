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
        bullets: [],
        game: true,
        connectedTime: null,
        gameOver: false
    }

    componentWillUnmount(){
        this.props.hub
        .invoke('OnDisconnect', this.props.current_user.id)
        .catch(err => { console.log('error'); console.log(err)});
    }

    componentWillMount(){
        const players = this.props.game.players.data;

        this.props.setFirstPlayer(players.find(el => (el.info.id == this.props.current_user.id)));
        this.props.setSecondPlayer(players.find(el => (el.info.id != this.props.current_user.id)));
        

        if(players.length < 2){
            this.setOnline(false);
        }

        for(var i = 0; i < players.length;i++){
            if(players[i].info.online == false && players[i].info.id !=  this.props.current_user.id){
                this.setOnline(false);
                break;
            }
        }

        if(this.props.hub != null){

            this.props.hub.on('ReceiveOnline', (data) => {
                const players = this.props.game.players.data;
                let player = players.find((x) => (x.info.id == data));
                if(player != null)
                player.info.online = true;
            });

            this.props.hub.on('StartGame', (data) => {
                this.setOnline(true);
            });

            this.props.hub.on('ReceiveOffline', (data) => {
                const players = this.props.game.players.data;
                let player = players.find((x) => (x.info.id == data));
                player.info.online = false;
                this.setOnline(false);
            });

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
                current_player.setMap(map);
                current_player.enemies = players.filter((x) => (x.info.id != data.ownerId));
                current_player.move(data.direct, this.props.game.ctx);
            });
            
            this.props.hub
            .invoke('OnConnect', this.props.gameId ,this.props.current_user.id)
            .catch(err => { console.log('error'); console.log(err)});
        }
    }

    gameOver = (val) => {
        this.setState({
            gameOver: true,
            winner: val
        });
    }

    addBullet = (bullet) => {
        this.setState({
            bullets: this.state.bullets.concat([bullet]), 
            game: this.state.game
        });
    }

    setOnline = (val) => {
        this.setState({
            bullets: this.state.bullets,
            game: val,
            connectedTime: val ? Date.now() : null 
        });
    }

    deleteBullet = (bullet) => {
        this.setState({
            bullets: this.state.bullets.filter((el) => (el != bullet)),
            game: this.state.game
        });   
    }

    render(){
        let { players, ctx, map } = this.props.game;
        const { current_user } = this.props;

        let current_player = players.data.find((x) => (x.info.id == current_user.id));

        players = players.data.map((x) => {
            if(x.x < 0 || x.y < 0){
                x.setMap(map.data.coor);
                this.props.hub.invoke(
                    'FirstPosition',
                    {
                       Id: x.info.id,
                       Position: '{"x": ' + x.center_x + ', "y": ' + x.center_y + '}',    
                       Players: players.data.filter((x) => (x.info.id != current_player.info.id)).map(x => (x.info.id)).join(',') 
                    }
                )} else
                {
                    x.setMap(map.data.coor);
                }
            return x;
        });

        map.data.draw(ctx);

        players.forEach((x) => {
            x.draw(ctx);
            if(x.lives <= 0 && !this.state.gameOver)
            {console.log('info1');
            console.log(x.info);
                this.gameOver(x.info);
            }
        });


        const renderer = ({ hours, minutes, seconds, completed }) => {

            if (completed) {
              // Render a completed state
              return <>
              <KeyboardEventHandler
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
                      this.props.setFirstPlayer(current_player);
                  }else{            
                      const model = {
                          OwnerId: current_player.info.id,
                          Direct: direct_dict[key],
                          Players: players.filter((x) => (x.info.id != current_player.info.id)).map(x => (x.info.id)).join(',') 
                      }            
                      this.props.hub
                      .invoke('Move', model)
                      .catch(err => { console.log('error'); console.log(err)});
                      current_player.enemies = players.filter((x) => (x.info.id != current_user.id));
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
                                              x.lives --;
                                              const model = {
                                                  GameId: this.props.gameId,
                                                  PlayerId: x.info.id
                                              }
                                              if(current_player.info.id != x.info.id){                                              this.props.hub
                                              .invoke('Kill', model)
                                              .catch(err => { console.log('error'); console.log(err)});
                                              }
                                              if(x.lives <= 0){
                                                  const info = players.find(y => y.info.id != x.info.id);
                                                  this.gameOver(info);
                                              }
                                          }
                                          return x;
                                      });
                                      
                                    this.props.setFirstPlayer(current_player);
                                    this.props.setSecondPlayer(players.find(el => (el.info.id != current_player.info.id)));

                                  }
                                  const coor_x = b.coor.x;
                                  const coor_y = b.coor.y;

                                  if(coor_x >= 0 && coor_y >= 0){
                                      if(map.data.coor[coor_y][coor_x] > 0)
                                          map.data.coor[coor_y][coor_x] --;
                                  }
                                  this.deleteBullet(bullet);
                              }
                          }
                      );
                  }} /> : null}
                
          </> 
            } else {
              // Render a countdown
              return <div className="game-pause"><span>{hours}:{minutes}:{seconds}</span></div>;
            }
          };
          
        const game = this.state.game ? <Countdown 
                                        date={this.state.connectedTime + 5000}
                                        renderer={renderer}
                                    /> : <div className="game-pause">
               Wait for other players
            </div>;

            return <>
                {!this.state.gameOver ? game : <div className='game-pause'>Game Over</div>}
            </>
            
    }
    
}