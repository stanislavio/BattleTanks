import React, { Component } from "react";
import { connect } from "react-redux";
import { findGame, joinToGame, resetFindGame } from "../actions/game";
import { get_tanks } from "../actions/tanks";
import Spinner from "../components/spinner";
import FindGame from "../components/find_game";

class FindGameWrapper extends Component {
  componentDidMount() {
    this.props.find_game();
    if (this.props.tanks.data == null) {
      this.props.get_tanks();
    }
  }

  componentWillUnmount() {
    this.props.reset_find_game();
  }

  render() {
    const { isPending, isSuccess, isError, data } = this.props.findGame;
    const content =
      isSuccess && this.props.tanks.isSuccess ? (
        <FindGame
          user={this.props.user}
          info={this.props.infoStatus}
          joinToGame={this.props.join_to_game}
          tanks={this.props.tanks.data}
          data={data}
        />
      ) : null;
    const spinner = isPending ? <Spinner /> : null;

    return (
      <div className="container">
        {spinner}
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    findGame: state.findGame,
    tanks: state.tanks,
    infoStatus: state.infoStatus,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset_find_game: () => dispatch(resetFindGame()),
    find_game: () => dispatch(findGame()),
    get_tanks: () => dispatch(get_tanks()),
    join_to_game: (gameId, tankId) => dispatch(joinToGame(gameId, tankId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindGameWrapper);
