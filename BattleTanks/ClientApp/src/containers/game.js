import React, { Component } from "react";

import { connect } from 'react-redux';

import set_game from '../actions/game';

import KeyboardEventHandler from 'react-keyboard-event-handler';

import { WIDTH, HEIGHT } from '../components/game/oop/constants';

class GameWrapper extends Component{

    componentDidMount(){
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.rect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "black";
      ctx.fill();
      this.props.set_game(ctx, '', '');
    }

    render(){
        return <>
        const { player, ctx, map } = this.props.game;
        return <div className='mt-2 col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2'>
            
              <KeyboardEventHandler
                handleKeys={['w', 'a', 's', 'd']}
                onKeyEvent={(key, e) => player.move(key, ctx, map)} />

            <canvas ref="canvas" width={WIDTH} height={HEIGHT} />
            </div>
         </>
    }

}


const mapStateToProps = state => {
    return {
        game: state.game
    }
}

const mapDispatchToProps = dispatch => {
  return {
    set_game: (ctx, player, id) => dispatch(set_game(ctx, player, id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWrapper);