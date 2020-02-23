import React, { Component } from "react";

import { connect } from 'react-redux';

import set_game from '../actions/game';


class GameWrapper extends Component{

    render(){
        return <>
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
)(GaneWrapper);