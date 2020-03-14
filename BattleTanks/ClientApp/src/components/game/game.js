import React, { Component } from 'react';
import './game.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Sprite from './oop/sprite';
import Map from './oop/map';
import { connect } from 'react-redux';
import set_game from '../../actions/game';
import { WIDTH, HEIGHT } from './oop/constants';

export default class Game extends Component{    
    
    render(){
        console.log(this.props);
        let { players, ctx, map } = this.props.game;
        const { current_user } = this.props;
        players = players.data.map((x) => {
            x.map = map.data.coor;
            return x;
        });
        let current_player = players.find((x) => (x.info.id == current_user.id));
        map.data.draw(ctx);
        current_player.draw(ctx);
        console.log(current_player);
        return  <KeyboardEventHandler
                handleKeys={['w', 'a', 's', 'd']}
                onKeyEvent={(key, e) => current_player.move(key, ctx)} />
            
    }
    
}