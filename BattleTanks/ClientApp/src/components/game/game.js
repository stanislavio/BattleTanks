import React, { Component } from 'react';
import './game.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Sprite from './oop/sprite';
import { connect } from 'react-redux';
import set_game from '../../actions/game';
import { WIDTH, HEIGHT } from './oop/constants';

export default class Game extends Component{    

    componentWillMount() {
        const { player, map, ctx } = this.props.game;
        player.draw(ctx);
        map.draw(ctx);
    }
    
    render(){
        const { player, ctx, map } = this.props.game;
        return <KeyboardEventHandler
                handleKeys={['w', 'a', 's', 'd']}
                onKeyEvent={(key, e) => player.move(key, ctx, map)} />
            
    }
    
}