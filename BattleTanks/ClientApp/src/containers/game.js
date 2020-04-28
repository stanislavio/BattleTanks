import React, { Component } from "react";
import { connect } from 'react-redux';

import Countdown from 'react-countdown-now';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import {setPlayers, setGame, set_canvas, reset_game, saveGameData, saveGameMapData} from '../actions/game';
import { WIDTH, HEIGHT } from '../components/game/oop/constants';
import Game from '../components/game';
import Spinner from '../components/spinner';
import get_user from '../actions/profile'
import Grid from '@material-ui/core/Grid';

class GameWrapper extends Component{


    state = {
      firstPlayer: {},
      secondPlayer: {},
      render: true
    }

    setFirstPlayer = (data) => {
      this.setState({
        firstPlayer: data
      });
    }

    setSecondPlayer = (data) => {
      this.setState({
        secondPlayer: data
      });
    }

    setRender = (val) => {
        this.setState({
          render: val
        });
    }

    componentDidMount(){
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      this.props.set_canvas(ctx);
      
      const { gameId } = this.props.match.params;
      this.props.set_players(gameId);
      this.props.set_game(gameId);
      // this.props.hubConnection.on('ReceiveOnline', (data) => {
      //   this.props.set_players(gameId);
      // });
    }

    componentWillUnmount(){
      const map = this.props.game.map.data.coor;
      const coor = map.map((x) => (
        x.join(',')  
      )).join('|');
      this.props.saveGameMapData({
        Id: this.props.match.params.gameId,
        CurrentMap: coor
      });
      this.props.saveGameData(this.props.game.players.data.map((el) => ({
        Id: el.info.id,
        Position: '{"x": ' + el.center_x + ', "y":' + el.center_y + ', "direct": "'+ el.direct +'"}'
      })));
        this.props.reset_game();
    }

    render(){
      let { players, map, ctx, data } = this.props.game;
     
      if(ctx != null){ 
      ctx.beginPath();
        ctx.rect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "black";
        ctx.fill();
      }
      const content = players.isSuccess & map.isSuccess ? <Game rebuild_user={() => this.props.rebuild_user(this.props.id)} setPlayers={() => {if(this.props.game.players.data.length < 2) this.props.set_players(this.props.match.params.gameId)}} setFirstPlayer={this.setFirstPlayer} setSecondPlayer={this.setSecondPlayer} gameId={this.props.match.params.gameId} hub={this.props.hubConnection} game={this.props.game} current_user={this.props.user} /> : null;
      const spinner = players.isPending & map.isPending ? <Spinner /> : null;
      
      const gameOver = data != null && data.winnerId != null ? <div>Game Over</div> : null;
      console.log(data != null ? data.started : null);
      const renderer = ({ hours, minutes, seconds, completed }) => {
        if(completed){
          return <div>Game Over</div>
        }
        else{
            return <div>{minutes}:{seconds} s</div>
        }
      }

      const rechargeRender = (props) => {
 
        if(props.api.isCompleted()){
            return <div>Ready to shoot</div>
        }
        else{
            return <div>Recharged through: {props.total / 1000} s</div>
        }
      }

      const renderLives = (lives) => {
        let l = [];
        for(var i = 0;i< lives;i++){
            l.push(<span><i className="fas fa-heart"></i></span>);
        }
        return l.map(el => (el));
      }

      const renderPlayerInfo = (player) => {
        console.log('rendering');
        if(player.info != null){
          return <div>{player.info.nickname} {renderLives(player.lives)} 
                                                            </div>
        }
        return <div></div>
    }


      return <div>    
        
        <Grid container 
        direction="row"
        justify="space-between"
        >

        {data != null ?
        
         <> 
          <Grid item xs={6} className="text-center">
            {this.state.firstPlayer != {} ? renderPlayerInfo(this.state.firstPlayer) : null}
          </Grid>

          <Grid item xs={6} className="text-center">
            {this.state.secondPlayer != {} && this.state.secondPlayer != null ? renderPlayerInfo(this.state.secondPlayer) : null}
          </Grid>
        </>
        : null}
        {spinner || content}

        <canvas ref="canvas" width={WIDTH} height={HEIGHT} />

        </Grid>

      </div>
    }

}


const mapStateToProps = state => {
    return {
        game: state.game,
        user: state.user,
        hubConnection: state.hub
    }
}

const mapDispatchToProps = dispatch => {
  return {
    rebuid_user: (id) => dispatch(get_user(id)),
    set_canvas: (ctx) => dispatch(set_canvas(ctx)),
    reset_game: () => dispatch(reset_game()),
    set_game: (gameId) => dispatch(setGame(gameId)),
    set_players: (gameId) => dispatch(setPlayers(gameId)),
    saveGameData: (data) => dispatch(saveGameData(data)),
    saveGameMapData: (data) => dispatch(saveGameMapData(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWrapper);