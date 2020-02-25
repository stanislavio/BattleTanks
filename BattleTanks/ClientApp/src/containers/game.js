import React, { Component } from "react";
import { connect } from 'react-redux';

import KeyboardEventHandler from 'react-keyboard-event-handler';

import {set_game, reset_game} from '../actions/game';
import { WIDTH, HEIGHT } from '../components/game/oop/constants';
import Game from '../components/game';
import Spinner from '../components/spinner';

class GameWrapper extends Component{

    componentDidMount(){
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      this.props.set_game(ctx, '', '');
    }

    componentWillUnmount(){
        this.props.reset_game();
    }

    render(){
      const { isSuccess, isPending, ctx } = this.props.game;
      if(isSuccess)
      {
        ctx.beginPath();
        ctx.rect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "black";
        ctx.fill();
      }
      const content = isSuccess ? <Game game={this.props.game} /> : null;
      const spinner = isPending ? <Spinner /> : null;
      
      return <div className='mt-2 col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2'>    
        {spinner || content}
        <canvas ref="canvas" width={WIDTH} height={HEIGHT} />
      </div>
    }

}


const mapStateToProps = state => {
    return {
        game: state.game
    }
}

const mapDispatchToProps = dispatch => {
  return {
    set_game: (ctx, player, id) => dispatch(set_game(ctx, player, id)),
    reset_game: () => dispatch(reset_game())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWrapper);