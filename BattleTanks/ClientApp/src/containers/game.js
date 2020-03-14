import React, { Component } from "react";
import { connect } from 'react-redux';

import KeyboardEventHandler from 'react-keyboard-event-handler';

import {setPlayers, setGame, set_canvas, reset_game} from '../actions/game';
import { get_tanks } from '../actions/tanks';
import { get_maps } from '../actions/maps';
import { WIDTH, HEIGHT } from '../components/game/oop/constants';
import Game from '../components/game';
import Spinner from '../components/spinner';

class GameWrapper extends Component{

    componentDidMount(){
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      this.props.set_canvas(ctx);
      
      const { gameId } = this.props.match.params;
      this.props.set_players(gameId);
      this.props.set_game(gameId);
    }

    componentWillUnmount(){
        this.props.reset_game();
    }

    render(){
      let { players, map, ctx } = this.props.game;
     
      if(ctx != null){ 
      ctx.beginPath();
        ctx.rect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "black";
        ctx.fill();
      }
      const content = players.isSuccess & map.isSuccess ? <Game game={this.props.game} current_user={this.props.user} /> : null;
      const spinner = players.isPending & map.isPending ? <Spinner /> : null;
      
      return <div className='mt-2 col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2'>    
        {spinner || content}
        <canvas ref="canvas" width={WIDTH} height={HEIGHT} />
      </div>
    }

}


const mapStateToProps = state => {
    return {
        game: state.game,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
  return {
    set_canvas: (ctx) => dispatch(set_canvas(ctx)),
    reset_game: () => dispatch(reset_game()),
    set_game: (gameId) => dispatch(setGame(gameId)),
    set_players: (gameId) => dispatch(setPlayers(gameId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWrapper);